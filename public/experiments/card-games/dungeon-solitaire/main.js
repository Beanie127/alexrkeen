import { DungeonDeck } from "../deck-builder.js";
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
      encounter: {
        exists: false,
        failedMaze: false,
        type: "",
        rating: 0,
      },
    };
    this.deck = new DungeonDeck();
  }

  advance() {
    this.depth++;
    btnAdvance.setAttribute("hidden", true);
    btnDraw.removeAttribute("hidden");
    this.newTurn(delve);
  }

  retreat() {
    if (this.retreating == false) {
      updateMessage(
        "Daring to go no further, you turn around and begin to seek the exit."
      );
    }
    this.retreating = true;
    this.depth--;
    btnAdvance.setAttribute("hidden", true);
    if (this.depth == 0) {
      this.winRun();
      return;
    }
    btnDraw.removeAttribute("hidden");
    this.newTurn(delveRetreat);
  }

  newTurn() {
    this.turnCount++;
    this.active.stack.cards = [];
    this.active.encounter.exists = false;
    this.active.encounter.type = "";
    this.active.encounter.rating = 0;
    if (this.retreating == true) {
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

  drawCard() {
    btnDraw.setAttribute("disabled", true);
    setTimeout(() => {
      btnDraw.removeAttribute("disabled");
    }, 1405);
    this.active.card = this.deck.draw();
    showCurrentCard(this.active.card);
    this.sortCard();
  }

  placeCard(card, targetArray, targetElement, sourceArray) {
    const oldCopy = document.querySelector(`[data-id="${card.id}"]`);
    oldCopy?.remove();
    targetElement.innerHTML += `<div class="card fade-in" data-id="${card.id}">${card.name}</div> `;
    setTimeout(() => {
      document.querySelector(".fade-in")?.classList.remove("fade-in");
    }, 1200);
    targetArray.push(card);
    if (sourceArray) {
      sourceArray.filter((x) => {
        x != card;
      });
    }
  }

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
      case "event":
        switch (cardToSort.name) {
          case "The Tower":
            this.shiftingTerrain();
            break;
        }
        break;
      case "skill":
        this.placeCard(
          cardToSort,
          this.active.stack.cards,
          this.active.stack.elem
        );
        updateMessage(
          `You find ${this.active.card.name} and add it to your hand. Use it wisely.`
        );
        setTimeout(() => {
          this.placeCard(
            cardToSort,
            this.hand,
            handTrack,
            this.active.stack.cards
          );
        }, 600);
        // TODO: add skill logic
        break;
      case "treasure":
      case "blessing":
      case "item":
      case "companion":
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
        if (this.active.encounter.exists == false) {
          this.startEncounter();
        } else {
          this.continueEncounter();
        }
        break;
      case "favour":
        this.placeCard(
          cardToSort,
          this.active.stack.cards,
          this.active.stack.elem
        );
        if (this.active.encounter.exists) {
          this.winEncounter();
        }
        break;
    }
  }

  checkParty() {
    if (
      this.companions.some((companion) => companion.name === "The Magician")
    ) {
      this.active.encounter.rating--;
    }
    if (
      this.active.encounter.type == "monster" &&
      this.companions.some((companion) => companion.name === "Page of Swords")
    ) {
      this.active.encounter.rating--;
    }
    if (
      this.active.encounter.type == "trap" &&
      this.companions.some(
        (companion) => companion.name === "Page of Pentacles"
      )
    ) {
      this.active.encounter.rating--;
    }
    if (
      this.active.encounter.type == "door" &&
      this.companions.some((companion) => companion.name === "Page of Wands")
    ) {
      this.active.encounter.rating--;
    }
  }

  startEncounter() {
    btnRetreat.setAttribute("hidden", true);
    this.active.encounter.exists = true;
    this.active.encounter.type = this.active.card.encounter.type;
    this.active.encounter.rating = this.active.card.rank;
    this.checkParty();
    updateMessage(`You are confronted by a ${this.active.encounter.type}.`);
    if (this.active.stack.cards.some((card) => card.type == "favour")) {
      this.winEncounter();
    }
  }

  continueEncounter() {
    if (this.active.card.rank >= this.active.encounter.rating) {
      console.log("Encounter won");
      this.winEncounter();
    } else {
      // otherwise, see what kind of encounter it is and deal damage accordingly
      const shortfall = this.active.encounter.rating - this.active.card.rank;
      console.log(`shortfall of ${shortfall}`);
      switch (this.active.encounter.type) {
        case "monster":
          this.takeDamage(shortfall);
          break;
        case "trap":
          this.loseEncounter(
            "You set off the trap and scurry away, abandoning all gains."
          );
          this.takeDamage(shortfall);
          break;
        case "door":
          this.discard(shortfall);
          this.loseEncounter(
            `The door will not budge. You waste ${shortfall} hours as you seek another path.`
          );
          break;
        case "maze":
          if (this.active.encounter.failedMaze == false) {
            updateMessage("You lose yourself in the maze.");
          }
          this.active.encounter.failedMaze = true;
          switch (this.active.card.encounter.type) {
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

  winEncounter() {
    btnDraw.setAttribute("hidden", true);
    if (this.active.encounter.failedMaze == true) {
      updateMessage(
        `You escape the maze, leaving behind all gains you saw along the way.`
      );
    } else {
      updateMessage(
        `You overcome the ${this.active.encounter.type}, rescue any companions and collect any items and treasure.`
      );
    }
    setTimeout(() => {
      if (this.active.encounter.failedMaze == false) {
        this.active.stack.cards.sort((a, b) => a.worth - b.worth);
        this.active.stack.cards.forEach((card) => {
          if (card.worth > 0 && this.active.stack.cards.length != 1) {
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
              updateMessage(`${card.name} joins your party.`);
              break;
            case "blessing":
            case "item":
              this.placeCard(
                card,
                this.hand,
                handTrack,
                this.active.stack.cards
              );
              break;
          }
        });
      }
      this.active.encounter.failedMaze = false;
      if (this.retreating == false) {
        btnAdvance.removeAttribute("hidden");
      }
      btnRetreat.removeAttribute("hidden");
    }, 2000);
  }

  loseEncounter(reason) {
    updateMessage(reason);
    btnDraw.setAttribute("hidden", true);
    if (this.retreating == false) {
      btnAdvance.removeAttribute("hidden");
    }
    btnRetreat.removeAttribute("hidden");
  }

  loseRun(reason) {
    updateMessage(
      `${reason} GAME OVER. For your records: X ${this.active.card.type}/${this.turnCount}`,
      true
    );
    btnAdvance.setAttribute("hidden", true);
    btnRetreat.setAttribute("hidden", true);
    btnDraw.setAttribute("hidden", true);
    btnStart.removeAttribute("hidden");
  }

  winRun() {
    updateMessage(`You escaped the dungeon!`, true);
    btnDraw.setAttribute("hidden", true);
    btnAdvance.setAttribute("hidden", true);
    btnRetreat.setAttribute("hidden", true);
    btnStart.removeAttribute("hidden");
    let gemCount = 0;
    this.treasure.forEach((card) => {
      this.score += card.worth;
      if ((card.suit = "Major Arcana")) {
        gemCount++;
      }
    });
    updateMessage(`You scored ${gemCount}/${this.score}.`);
    if (gemCount == 60 && this.score == 178) {
      updateMessage("A perfect score!");
    }
  }

  discard(shortfall) {
    for (let i = 1; i <= shortfall; i++) {
      (function (i) {
        console.log(i);
        setTimeout(() => {
          const discard = this.deck.draw();
          showCurrentCard(discard);
          if (discard.type == "Ace") {
            this.burnTorch(card);
          } else {
            this.discards.push(discard);
          }
        }, (i - 1) * 1200);
      });
    }
  }

  takeDamage(damage) {
    if (
      this.companions.some((companion) => companion.name === "Page of Cups")
    ) {
      damage--;
    }
    if (damage == 0) {
      updateMessage("The Page of Cups protects you from harm.");
      return;
    }
    this.hp -= damage;
    console.log(`Current HP = ${this.hp}`);
    if (this.hp <= 1) {
      this.loseRun(
        `The ${this.active.encounter.type} deals you a mortal injury. You perish in the dungeon.`
      );
    } else {
      hpDisplay.textContent = `${this.hp} of Cups`;
      updateMessage(
        `The ${this.active.encounter.type} injures you. You lose ${damage} HP.`
      );
    }
  }

  burnTorch() {
    this.torchesRemaining--;
    if (this.torchesRemaining == 0) {
      this.loseRun(
        "Your last torch goes out. You are lost in the darkness of the dungeon."
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
    updateMessage(
      `The dungeon is starting to affect you. You feel the swell of corruption in your soul.`
    );
  }

  shiftingTerrain() {
    updateMessage(
      "A distant rumbling in the darkness builds to a deafening roar as the dungeon restructures itself around you."
    );
    this.discards.forEach((discard) => this.deck.cardsInDeck.push(discard));
    if (this.companions.length > 0) {
      const victim = this.companions.length.pop();
      this.discards.push(victim);
      updateMessage(`The ${victim.name} is killed in the turmoil.`);
      document.querySelector(`[data-id="${victim.id}"]`).remove();
    }
  }
}
// local functions

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

// start the game

let run = new Run();

console.log(run.deck);

// API

btnStart.addEventListener("click", () => {
  refreshPlayArea();
  run = new Run();
  run.advance();
  showCurrentCard();
  btnDraw.removeAttribute("hidden");
  btnRetreat.removeAttribute("hidden");
  btnStart.setAttribute("hidden", true);
});

btnDraw.addEventListener("click", () => {
  run.drawCard();
});

btnAdvance.addEventListener("click", () => {
  run.advance();
});

btnRetreat.addEventListener("click", () => {
  btnAdvance.setAttribute("hidden", true);
  run.retreat();
});
