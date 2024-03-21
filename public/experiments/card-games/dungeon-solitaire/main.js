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
    this.isLost = false;
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
    // reset this.active
    this.active.stack.cards = [];
    this.active.encounter.exists = false;
    this.active.encounter.type = "";
    this.active.encounter.rating = 0;
    // set the active stack based on direction and current depth
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
    showCard(this.active.card);
    this.sortCard();
  }

  placeCard(card, targetArray, targetElement, sourceArray) {
    // if the card's already on the table, 'pick it up' i.e. remove from the previous stack/array
    const oldCopy = document.querySelector(`[data-id="${card.id}"]`);
    oldCopy?.remove();
    if (sourceArray) {
      sourceArray.filter((x) => {
        x != card;
      });
    }
    // put it in the target stack/array
    targetElement.innerHTML += `<div class="card fade-in" data-id="${card.id}">${card.name}</div> `;
    setTimeout(() => {
      document.querySelector(".fade-in")?.classList.remove("fade-in");
    }, 1200);
    targetArray.push(card);
  }

  sortCard() {
    const cardToSort = this.active.card;
    // put the card in the active stack first so it's visible
    this.placeCard(cardToSort, this.active.stack.cards, this.active.stack.elem);
    // then wait 600 ms before doing anything with it
    setTimeout(() => {
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
          updateMessage(
            `You find ${this.active.card.name} and add it to your hand. Use it wisely.`
          );
          this.placeCard(
            cardToSort,
            this.hand,
            handTrack,
            this.active.stack.cards
          );
          // TODO: add skill logic
          break;
        case "action":
          if (this.active.encounter.exists == false) {
            this.startEncounter();
          } else {
            this.continueEncounter();
          }
          break;
        case "favour":
          updateMessage("You feel the favour of the divine wash over you.");
          if (this.active.encounter.exists) {
            this.winEncounter();
          }
          break;
      }
    }, 600);
  }

  checkParty() {
    if ((this.companions.length = 0)) return;
    if (
      this.companions.some((companion) => companion.name === "The Magician")
    ) {
      this.active.encounter.rating--;
      console.log(`Encounter rating reduced by ${companion.name}`);
    }
    if (
      this.active.encounter.type == "monster" &&
      this.companions.some((companion) => companion.name === "Page of Swords")
    ) {
      this.active.encounter.rating--;
      console.log(`Encounter rating reduced by ${companion.name}`);
    }
    if (
      this.active.encounter.type == "trap" &&
      this.companions.some(
        (companion) => companion.name === "Page of Pentacles"
      )
    ) {
      this.active.encounter.rating--;
      console.log(`Encounter rating reduced by ${companion.name}`);
    }
    if (
      this.active.encounter.type == "door" &&
      this.companions.some((companion) => companion.name === "Page of Wands")
    ) {
      this.active.encounter.rating--;
      console.log(`Encounter rating reduced by ${companion.name}`);
    }
    if (this.active.encounter.rating == 0) {
      updateMessage(
        `With the help of your companions, the ${this.active.encounter.type} prevents little challenge.`
      );
      this.winEncounter();
    }
  }

  startEncounter() {
    this.active.encounter.exists = true; // we're in an encounter
    btnRetreat.setAttribute("hidden", true); // no going back now
    this.active.encounter.type = this.active.card.encounter.type;
    this.active.encounter.rating = this.active.card.rank;
    updateMessage(`You are confronted by a ${this.active.encounter.type}.`);
    // adjust the active encounter rating depending on what companions you have
    this.checkParty();
    if (this.active.stack.cards.some((card) => card.type == "favour")) {
      this.winEncounter();
    }
  }

  continueEncounter() {
    // if the current card meets or beats the encounter rating, you win
    if (this.active.card.rank >= this.active.encounter.rating) {
      console.log("Encounter won");
      this.winEncounter();
    } else {
      // suffer the difference between the party
      const shortfall = this.active.encounter.rating - this.active.card.rank;
      console.log(`shortfall of ${shortfall}`);
      switch (this.active.encounter.type) {
        case "monster":
          this.takeDamage(shortfall);
          break;
        case "trap":
          this.takeDamage(shortfall);
          if (!this.isLost) {
            this.loseEncounter("You wisely retreat, abandoning all gains.");
          }
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
    this.active.stack.cards.sort((a, b) => a.worth - b.worth);
    // delay so everything doesn't pop out of the stack immediately and you can see what's happening
    // TODO: check this works
    setTimeout(() => {
      if (this.active.encounter.failedMaze == false) {
        this.active.stack.cards.forEach((card) => {
          if (this.active.stack.cards.length > 1) {
            if (card.worth > 0) {
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

  loseRun(message, cause) {
    this.isLost == true;
    updateMessage(
      `${message} GAME OVER. For your records: X ${cause}/${this.turnCount}`,
      true
    );
    btnAdvance.setAttribute("hidden", true);
    btnRetreat.setAttribute("hidden", true);
    btnDraw.setAttribute("hidden", true);
    btnStart.removeAttribute("hidden");
  }

  discard(shortfall) {
    // TODO: solve this complete mess
    let leftToDiscard = shortfall;
    console.log(`You should be about to discard ${leftToDiscard} cards`);
    let i = 0;
    let timeout = 0;
    for (leftToDiscard; leftToDiscard > 0; leftToDiscard--) {
      console.log("Discarding...");
      timeout = i * 1200 + 1; // repeat at 1.2s intervals
      setTimeout(() => {
        console.log(`Setting timeout for ${timeout}`);
        const discard = this.deck.draw();
        updateMessage(discard.name);
        console.log(`${discard.name} drawn.`);
        showCard(discard);
        if (discard.type == "Ace") {
          this.placeCard(discard, this.discards, torchTrack);
          this.burnTorch(card);
        } else {
          this.discards.push(discard);
        }
      }, timeout);
      i++;
      console.log(`${leftToDiscard} cards to discard`); // count down number of cards to discard
    }
  }

  takeDamage(damage) {
    if (
      this.companions.some((companion) => companion.name === "Page of Cups")
    ) {
      damage--;
      console.log("Damage reduced by the Page of Cups");
    }
    if (damage == 0) {
      updateMessage("The Page of Cups protects you from harm.");
      return;
    }
    this.hp -= damage;
    console.log(`Current HP = ${this.hp}`);
    if (this.hp <= 1) {
      this.loseRun(
        `The ${this.active.encounter.type} deals you a mortal injury. You perish in the dungeon.`,
        this.active.encounter.type
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
        "Your last torch goes out. You are lost in the darkness of the dungeon.",
        "torch"
      );
    } else {
      updateMessage(
        `One of your torches burns out. You have ${this.torchesRemaining} torches remaining.`
      );
    }
  }

  gainCorruption() {
    if (this.corruption.length == 2) {
      this.loseRun("The corruption of the dungeon consumes you.", "corruption");
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

function showCard(card) {
  console.log(`Showing ${card.name}`);
  displayCurrentCard.textContent = card.name;
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

let run = new Run();

// API

btnStart.addEventListener("click", () => {
  refreshPlayArea();
  run = new Run();
  console.log(run.deck);
  run.advance();
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
