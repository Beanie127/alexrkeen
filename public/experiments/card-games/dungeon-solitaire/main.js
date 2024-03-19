import { Deck, TarotDeck } from "../deck-builder.js";
import { renderCard, delay } from "../utils.js";

const btnDrawCard = document.querySelector("#draw-card");
const btnRetreat = document.querySelector("#retreat");
const message = document.querySelector("#message");
const torchTrack = document.querySelector("#torch-track");
const delve = document.querySelector("#delve");
const delveRetreat = document.querySelector("#delve-reteat");
const displayCurrentCard = document.querySelector("#display-current-card");

class Run {
  constructor() {
    this.hp = 10;
    this.turnCount = 0;
    this.depth = 0;
    this.retreating = false;
    this.companions = [];
    this.hand = [];
    this.haul = [];
    this.discards = [];
    this.haulValue = 0;
    this.torchesRemaining = 4;
    this.corruption = 0;
    this.active = {
      stackElem: false,
      stack: [],
      card: {},
      challenge: {
        type: false,
        treasures: [],
        damage: 0,
        aides: [],
      },
    };
    this.deck = new TarotDeck();
    5338;
  }

  lose(reason) {
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

  newTurn(target) {
    // when you start a new turn:
    // increase the turn count
    this.turnCount++;
    // - empty the active stack array
    this.active.stack = [];
    // - create a new div with a unique data attribtute in the target div
    target.innerHTML += `
    <div class="stack" data-turn="${this.turnCount}"></div>
    `;
    // - assign that stack to this.active.stackElem so you can manipulate it
    this.active.stackElem = document.querySelector(
      `[data-turn="${this.turnCount}"]`
    );
    if (this.depth == 1) {
      updateMessage(`You are ${this.depth} room deep into the dungeon.`, true);
    } else {
      updateMessage(`You are ${this.depth} rooms deep into the dungeon.`, true);
    }
    this.drawACard();
  }

  //wip
  drawACard() {
    // draw a new card from the deck and make it the active card
    this.active.card = this.deck.draw();
    // add it to the active stack
    this.active.stack.push(this.active.card);
    // flash it on the screen
    showCurrentCard(this.active.card);
    // work out what's going on!
    // check if this is a torch and if so, burn it
    if (this.active.card.type == "Ace") {
      this.burnTorch(this.active.card);
      return;
      // then check if it's a number
    } else if ((this.active.card.type = "Number")) {
      if (!this.active.challenge.type) {
        //
        // if it is, then
        switch (this.active.card.suit) {
          case "Swords":
          case "Pentacles":
          case "Wands":
          case "Major Arcana": {
          }
        }
      }
      // TODO sorting logic - definitely split these into their own functions for the challenge types
      if (this.active.challenge.type) {
        if (this.active.card.value >= this.active.challenge.rating) {
          this.winChallenge();
        } else {
          if (
            this.active.challenge.type == "monster" ||
            this.active.challenge.type == "trap"
          ) {
            const damage = this.active.challenge.rating - card.value;
            this.takeDamage(damage, this.active.challenge.type);
          } else if (this.active.challenge.type == "locked door") {
            const lostTime = this.active.challenge.rating - card.value;
            this.discard(lostTime);
          } else if (this.active.challenge.type == "maze") {
            // TODO some shit if maze
          }
        }
      }
      // this.active.stackElem.innerHTML += renderCard(this.active.card);
    }
  }
  winChallenge() {
    this.haul.push(this.active.challenge.treasures);
    this.hand.push(this.active.challenge.aides);
    delveRetreat.removeAttribute("disabled");
    updateMessage(`You overcome the ${this.active.challenge.type}.`);
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

  takeDamage(damage, source) {
    this.hp -= damage;
    console.log(`Current HP = ${this.hp}`);
    if (this.hp <= 0) {
      this.lose(
        `You fall foul of ${source} and perish in the dungeon. GAME OVER`
      );
    } else {
      updateMessage(`You lose ${damage} HP. You have ${this.hp} remaining.`);
    }
  }
  burnTorch(card) {
    renderCard(torchTrack);
    this.torchesRemaining--;
    if (this.torchesRemaining == 0) {
      this.lose(
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
      this.lose("The corruption of the dungeon consumes you.");
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

async function updateMessage(newMessage, fresh = false) {
  if (fresh) {
    message.textContent = "";
  }
  message.textContent += newMessage + " ";
}
btnDrawCard.addEventListener("click", (e) => {
  if (run.turnCount == 0) {
    run.advance();
  } else {
    run.drawACard();
  }
  showCurrentCard();
});
