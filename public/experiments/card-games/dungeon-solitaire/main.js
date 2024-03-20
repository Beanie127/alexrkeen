import { DungeonDeck } from "../deck-builder.js";
import { renderCard, delay } from "../utils.js";
// controls
const btnDrawCard = document.querySelector("#draw-card");
const btnRetreat = document.querySelector("#retreat");
// notifications
const message = document.querySelector("#message");
const displayCurrentCard = document.querySelector("#display-current-card");
// card placements
const torchTrack = document.querySelector("#torch-track");
const treasureTrack = document.querySelector("#treasure-track");
const companionTrack = document.querySelector("#companion-track");
const handTrack = document.querySelector("#hand-track");
const corruptionTrack = document.querySelector("#corruption-track");
const delve = document.querySelector("#delve");
const delveRetreat = document.querySelector("#delve-reteat");
const hpDisplay = document.querySelector("#hp");

class Run {
  constructor() {
    this.hp = 10;
    this.turnCount = 0;
    this.depth = 0;
    this.retreating = false;
    this.companions = [];
    this.hand = [];
    this.treasure = [];
    this.discards = [];
    this.score = 0;
    this.torchesRemaining = 4;
    this.corruption = 0;
    this.active = {
      stack: {
        elem: {},
        cards: [],
      },
      card: {},
      challenge: {
        type: false,
        rating: 0,
      },
    };
    this.deck = new DungeonDeck();
  }

  drawCard() {
    btnDrawCard.setAttribute("disabled", true);
    this.active.card = this.deck.draw();
    showCurrentCard(this.active.card);
    setTimeout(() => {
      btnDrawCard.removeAttribute("disabled");
    }, 1401);
  }

  // move a card from one place to another
  placeCard(array, element) {
    const id = this.active.card.id;
    const oldCopy = document.querySelector(`[data-id="${id}"]`);
    oldCopy?.remove();
    renderCard(this.active.card, element);
    array.push(this.active.card);
    removeItemOnce(this.active.stack.cards, this.active.card);
  }

  // place the card in the appropriate track
  sortCard() {
    switch (this.active.card.type) {
      case "torch":
        this.placeCard(this.discards, torchTrack);
        this.burnTorch(this.active.card);
        break;
      case "companion":
        this.placeCard(this.companions, companionTrack);
        break;
      case "skill":
        this.placeCard(this.hand, handTrack);
        break;
      case "treasure":
      case "blessing":
      case "action":
      case "item":
      case "favour":
        this.placeCard(this.active.stack.cards, this.active.stack.elem);
        break;
    }
    if (this.active.card.type == "action") {
      this.processActionCard();
    }
  }

  processActionCard() {
    // if it's an action, do the thing
    if (this.active.card.type == "action") {
      console.log("Action card drawn");
      // if we're not yet in a challenge, make this the active challenge
      if (this.active.challenge.type == false) {
        updateMessage("Challenge Started!");
        this.active.challenge.type = this.active.card.challenge.type;
        this.active.challenge.rating = this.active.card.rank;
        // win if the stack already contains a blessing
        this.active.stack.cards.forEach((card) => {
          if (card.type == "blessing") {
            this.winChallenge();
          }
        });
      } else {
        // if we're in an active challenge, see if this card wins the challenge
        if (this.active.card.value >= this.active.challenge.rating) {
          console.log("Challenge won");
          this.winChallenge();
        } else {
          // otherwise, see what kind of challenge it is and deal damage accordingly
          const shortfall = this.active.challenge.rating - card.value;
          switch (this.active.challenge.type) {
            case "monster":
              this.takeDamage(shortfall, this.active.challenge.type);
              break;
            case "trap":
              this.takeDamage(shortfall, this.active.challenge.type);
              break;
            case "locked door":
              this.discard(shortfall);
              break;
            case "maze":
            // TODO some shit if maze
          }
        }
      }
    }
  }

  discard(lostTime) {
    for (let i = 1; i <= lostTime; i++) {
      const discard = this.deck.draw();
      showCurrentCard(discard);
      if (discard.type == "Ace") {
        this.burnTorch(card);
      } else {
        this.discards.push(discard);
      }
      delay(600);
    }
    updateMessage(
      `The door will not budge. You waste ${lostTime} hours as you seek another path.`
    );
  }
  newTurn() {
    // when you start a new turn:
    // increase the turn count
    this.turnCount++;
    // - empty the active stack array
    this.active.stack.cards = [];
    // - assign that stack to this.active.stackElem so you can manipulate it
    if (this.retreating) {
      this.active.stack.elem = document.querySelector(
        `#delve-retreat [data-depth="${this.depth}"]`
      );
    } else {
      this.active.stack.elem = document.querySelector(
        `#delve [data-depth="${this.depth}"]`
      );
    }
    if (this.depth == 1) {
      updateMessage(`You are ${this.depth} room deep into the dungeon.`, true);
    } else {
      updateMessage(`You are ${this.depth} rooms deep into the dungeon.`, true);
    }
    this.drawCard();
  }
  loseRun(reason) {
    updateMessage(reason);
    this.gameOver;
  }

  advance() {
    this.depth++;
    this.newTurn(delve);
  }

  retreat() {
    this.depth--;
    if (this.depth == 0) {
      updateMessage(`You escaped the dungeon!`);
      this.gameOver;
      return;
    }
    this.newTurn(delveRetreat);
  }

  winChallenge() {
    // find all cards that are treasure and make them treasure
    // TODO: enable buttons to progress or retreat
    this.active.stack.cards.forEach((card) => {
      if (card.suit == "Pentacles") {
        card.type = "treasure";
      }
      switch (card.type) {
        case "treasure":
          this.placeCard(this.treasure, treasureTrack);
          this.score += card.worth;
          break;
        case "companion":
          this.placeCard(this.companions, companionTrack);
          break;
        case "blessing" || "item":
          this.placeCard(this.hand, handTrack);
          break;
      }
    });
    delveRetreat.removeAttribute("disabled");
    updateMessage(`You overcome the ${this.active.challenge.type}!`);
  }

  takeDamage(damage, source) {
    this.hp -= damage;
    console.log(`Current HP = ${this.hp}`);
    hpDisplay.textContent = `${this.hp} of Cups`;
    if (this.hp <= 0) {
      this.loseRun(
        `You fall foul of ${source} and perish in the dungeon. GAME OVER`
      );
    } else {
      updateMessage(`You lose ${damage} HP. You have ${this.hp} remaining.`);
    }
  }
  burnTorch() {
    this.torchesRemaining--;
    if (this.torchesRemaining == 0) {
      this.loseRun(
        "Your last torch goes out. You are lost in the darkness of the dungeon. GAME OVER"
      );
    } else {
      updateMessage(
        `One of your torches burns out. You have ${this.torchesRemaining} torches remaining.`
      );
    }
  }
  gainCorruption(card) {
    this.corruption++;
    if (this.corruption == 0) {
      this.loseRun("The corruption of the dungeon consumes you.");
    }
  }
}

const run = new Run();

console.log(run.deck);

function showCurrentCard() {
  displayCurrentCard.textContent = run.active.card.name;
  displayCurrentCard.classList.add("show-card");
  setTimeout(() => {
    displayCurrentCard.classList.remove("show-card");
  }, 1201);
}

function updateMessage(newMessage, fresh = false) {
  if (fresh) {
    message.textContent = "";
  }
  message.textContent += newMessage + " ";
}
btnDrawCard.addEventListener("click", (e) => {
  if (run.turnCount == 0) {
    run.advance();
  } else {
    run.drawCard();
  }
  showCurrentCard();
});
