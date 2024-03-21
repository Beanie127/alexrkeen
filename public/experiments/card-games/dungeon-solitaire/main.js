import { DungeonDeck } from "../deck-builder.js";
import { delay } from "../utils.js";
// controls
const btnStart = document.querySelector("#btn-start");
const btnDraw = document.querySelector("#btn-draw");
const btnAdvance = document.querySelector("#btn-advance");
const btnRetreat = document.querySelector("#btn-retreat");
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
    this.corruption = [];
    this.active = {
      stack: {
        elem: {},
        cards: [],
      },
      card: {},
      challenge: {
        exists: false,
        type: "",
        rating: 0,
      },
      failedMaze: false,
    };
    this.deck = new DungeonDeck();
  }

  drawCard() {
    btnDraw.setAttribute("disabled", true);
    this.active.card = this.deck.draw();
    showCurrentCard(this.active.card);
    setTimeout(() => {
      btnDraw.removeAttribute("disabled");
    }, 1401);
    this.sortCard();
  }

  // move a card from one place to another
  placeCard(card, targetArray, targetElement, sourceArray) {
    const oldCopy = document.querySelector(`[data-id="${card.id}"]`);
    oldCopy?.remove();
    targetElement.innerHTML += ` <div class="card" data-id="${card.id}">${card.name}</div> `;
    targetArray.push(card);
    sourceArray?.filter((x) => {
      x != card;
    });
  }

  // place the card in the appropriate track
  sortCard() {
    const cardToSort = this.active.card;
    switch (cardToSort.type) {
      case "torch":
        this.placeCard(cardToSort, this.discards, torchTrack);
        this.burnTorch();
        break;
      case "corruption":
        this.placeCard(cardToSort, this.corruption, corruptionTrack);
        this.gainCorruption();
        break;
      case "companion":
        this.placeCard(cardToSort, this.companions, companionTrack);
        // TODO: add companion function
        break;
      case "skill":
        this.placeCard(cardToSort, this.hand, handTrack);
        // TODO: add skill logic
        break;
      case "treasure":
      case "blessing":
      case "item":
        this.placeCard(
          cardToSort,
          this.active.stack.cards,
          this.active.stack.elem
        );
        break;
      case "action":
        this.placeCard(
          cardToSort,
          this.active.stack.cards,
          this.active.stack.elem
        );
        this.processActionCard();
        break;
      case "favour":
        this.placeCard(
          cardToSort,
          this.active.stack.cards,
          this.active.stack.elem
        );
        if (this.active.challenge.exists) {
          this.winChallenge();
        }
        break;
    }
  }

  processActionCard() {
    console.log(this.active.challenge.exists);
    // if we're not yet in a challenge, make this the active challenge
    if (this.active.challenge.exists == false) {
      btnRetreat.setAttribute("hidden", true);
      updateMessage("Challenge Started!");
      this.active.challenge.exists = true;
      this.active.challenge.type = this.active.card.challenge.type;
      this.active.challenge.rating = this.active.card.rank;
      this.active.stack.cards.forEach((card) => {
        // win if the stack already contains a blessing
        if (card.type == "favour") {
          this.winChallenge();
        }
      });
      return;
    }
    if (this.active.card.rank >= this.active.challenge.rating) {
      console.log("Challenge won");
      this.winChallenge();
    } else {
      // otherwise, see what kind of challenge it is and deal damage accordingly
      const shortfall = this.active.challenge.rating - this.active.card.rank;
      console.log(`shortfall of ${shortfall}`);
      switch (this.active.challenge.type) {
        case "monster":
          this.takeDamage(shortfall);
          break;
        case "trap":
          this.takeDamage(shortfall);
          this.failChallenge(
            "You set off the trap, destroying any chance of retrieving the treasure."
          );
          break;
        case "door":
          this.discard(shortfall);
          this.failChallenge(
            "The door will not budge. You waste hours as you seek another path."
          );
          break;
        case "maze":
          // TODO: check maze logic works
          switch (this.active.card.challenge.type) {
            case "monster":
            case "trap":
              this.takeDamage(1);
              break;
            case "maze":
            case "door":
              this.discard(1);
              break;
          }
      }
    }
  }

  runMaze() {}

  discard(shortfall) {
    for (let i = 1; i <= shortfall; i++) {
      console.log("discarding");
      const discard = this.deck.draw();
      showCurrentCard(discard);
      if (discard.type == "Ace") {
        this.burnTorch(card);
      } else {
        this.discards.push(discard);
      }
    }
  }
  newTurn() {
    this.turnCount++;
    this.active.stack.cards = [];
    this.active.challenge.exists = false;
    this.active.challenge.type = "";
    this.active.challenge.rating = 0;
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
    btnAdvance.setAttribute("hidden", true);
    btnRetreat.setAttribute("hidden", true);
    btnDraw.setAttribute("hidden", true);
    btnStart.removeAttribute("hidden");
  }

  advance() {
    this.depth++;
    btnAdvance.setAttribute("hidden", true);
    btnRetreat.setAttribute("hidden", true);
    btnDraw.removeAttribute("hidden");
    this.newTurn(delve);
  }

  retreat() {
    this.depth--;
    btnAdvance.setAttribute("hidden", true);
    btnRetreat.setAttribute("hidden", true);
    if (this.depth == 0) {
      updateMessage(`You escaped the dungeon!`);
      btnStart.removeAttribute("hidden");
      return;
    }
    btnDraw.removeAttribute("hidden");
    this.newTurn(delveRetreat);
  }

  takeDamage(damage) {
    this.hp -= damage;
    console.log(`Current HP = ${this.hp}`);
    hpDisplay.textContent = `${this.hp} of Cups`;
    if (this.hp <= 0) {
      this.loseRun(
        "Your injury is fatal. You perish in the dungeon. GAME OVER"
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

  gainCorruption() {
    if (this.corruption.length == 2) {
      this.loseRun("The corruption of the dungeon consumes you.");
      return;
    }
    updateMessage(`You feel the touch of corruption in your soul.`);
  }

  winChallenge() {
    if (this.active.failedMaze == false) {
      this.active.stack.cards.sort((a, b) => a.worth - b.worth);
      this.active.stack.cards.forEach((card) => {
        if (card.worth > 0 && this.active.stack.cards.length > 1) {
          this.placeCard(
            card,
            this.treasure,
            treasureTrack,
            this.active.stack.cards
          );
          // TODO: add "drop treasure" functionality
        }
        switch (card.type) {
          case "companion":
            this.placeCard(
              card,
              this.companions,
              companionTrack,
              this.active.stack.cards
            );
            break;
          case "blessing":
          case "item":
            this.placeCard(card, this.hand, handTrack, this.active.stack.cards);
            break;
        }
      });
    }
    updateMessage(`You overcome the ${this.active.challenge.type}!`);
    this.active.failedMaze = false;
    btnDraw.setAttribute("hidden", true);
    if (this.retreating == false) {
      btnAdvance.removeAttribute("hidden");
    }
    btnRetreat.removeAttribute("hidden");
  }

  failChallenge(reason) {
    updateMessage(reason);
    btnDraw.setAttribute("hidden", true);
    btnAdvance.removeAttribute("hidden");
    btnRetreat.removeAttribute("hidden");
  }
}

let run = new Run();

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

function refreshPlayArea() {
  const leftOverCards = document.querySelectorAll(".card");
  leftOverCards.forEach((element) => {
    if (element.id == "hp" || element.id == "display-current-card") {
      return;
    }
    element.remove();
  });
}

btnStart.addEventListener("click", () => {
  refreshPlayArea();
  run = new Run();
  run.advance();
  showCurrentCard();
  btnDraw.removeAttribute("hidden");
  btnStart.setAttribute("hidden", true);
});

btnDraw.addEventListener("click", () => {
  run.drawCard();
});

btnAdvance.addEventListener("click", () => {
  run.advance();
});

btnRetreat.addEventListener("click", () => {
  run.retreating == true;
  btnAdvance.setAttribute("hidden", true);
  run.retreat();
});
