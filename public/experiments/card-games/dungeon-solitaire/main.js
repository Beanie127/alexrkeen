import { DungeonDeck } from "../deck-builder.js";
import { shuffle } from "../utils.js";

// controls
const btnStart = document.querySelector("#btn-start");
const btnDraw = document.querySelector("#btn-draw");
const btnAdvance = document.querySelector("#btn-advance");
const btnRetreat = document.querySelector("#btn-retreat");
// notifications
const narrator = document.querySelector("#narrator");
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
    this.corruption = [];
    this.torches = [];
    this.companions = [];
    this.hand = [];
    this.treasure = [];
    this.discards = [];
    this.score = 0;
    this.torchesRemaining = 4;
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

  // dungeon navigation

  startRun() {
    hpDisplay.textContent = "10 of Cups";
    const leftOverCards = document.querySelectorAll(".card");
    leftOverCards.forEach((element) => {
      if (element.id == "hp" || element.id == "display-current-card") {
        return;
      }
      element.remove();
    });
    run.advance();
  }

  advance() {
    this.flipStack();
    this.depth++;
    btnAdvance.setAttribute("hidden", true);
    btnDraw.removeAttribute("hidden");
    this.newTurn(delve);
  }

  retreat() {
    this.flipStack();
    if (this.retreating == false) {
      updateMessage(
        "Daring to go no further, you turn around and begin to seek the exit."
      );
    }
    this.retreating = true;
    this.depth--;
    btnAdvance.setAttribute("hidden", true);
    btnRetreat.setAttribute("hidden", true);
    if (this.depth == 0) {
      this.winRun();
      return;
    }
    btnDraw.removeAttribute("hidden");
    this.newTurn(delveRetreat);
  }

  // card manipulation

  newTurn() {
    this.turnCount++;
    // reset this.active
    this.active.stack.cards = [];
    this.active.encounter.exists = false;
    this.active.encounter.failedMaze = false;
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
    oldCopy?.classList.add("fade-out");
    if (sourceArray) {
      sourceArray.filter((x) => {
        x != card;
      });
    }
    // put it in the target stack/array
    targetElement.innerHTML += `<div class="card fade-in" data-id="${card.id}">${card.name}</div> `;
    setTimeout(() => {
      oldCopy?.remove();
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
          this.placeCard(cardToSort, this.torches, torchTrack);
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
          // TODO: this.makeUsable(cardToSort)
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
            if (this.active.encounter.failedMaze == true) {
              this.loseEncounter(
                "You escape the maze, leaving behind all gains you saw along the way."
              );
            } else {
              this.winEncounter();
            }
          }
          break;
      }
    }, 600);
  }

  // encounter processing

  checkParty() {
    if (this.companions.length == 0) return;
    if (
      this.companions.some((companion) => companion.name === "The Magician")
    ) {
      this.active.encounter.rating--;
      console.log(`Encounter rating reduced by The Magician`);
    }
    if (
      this.active.encounter.type == "monster" &&
      this.companions.some((companion) => companion.name === "Page of Swords")
    ) {
      this.active.encounter.rating--;
      console.log(`Encounter rating reduced by the Page of Swords`);
    }
    if (
      this.active.encounter.type == "trap" &&
      this.companions.some(
        (companion) => companion.name === "Page of Pentacles"
      )
    ) {
      this.active.encounter.rating--;
      console.log(`Encounter rating reduced by the Page of Pentacles`);
    }
    if (
      this.active.encounter.type == "door" &&
      this.companions.some((companion) => companion.name === "Page of Wands")
    ) {
      this.active.encounter.rating--;
      console.log(`Encounter rating reduced by the Page of Wands`);
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
      if (this.active.encounter.failedMaze == true) {
        this.loseEncounter(
          "You escape the maze, leaving behind all gains you saw along the way."
        );
      } else {
        this.winEncounter();
      }
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
          if (this.isLost == false) {
            setTimeout(() => {
              this.loseEncounter("You retreat, abandoning all gains.");
            }, 650);
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
            this.active.encounter.failedMaze = true;
            break;
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
              updateMessage(
                "You lose your way and waste an hour getting back on track."
              );
              break;
          }
      }
    }
  }

  winEncounter() {
    btnDraw.setAttribute("hidden", true);
    updateMessage(
      `You overcome the ${this.active.encounter.type} and collect any items and treasure.`
    );
    // sort active stack in order of worth
    this.active.stack.cards.sort((a, b) => a.worth - b.worth);
    const lastCard = this.active.stack.cards.shift();
    // delay so everything doesn't pop out of the stack immediately and you can see what's happening
    setTimeout(() => {
      // only take cards if player didn't fail in the maze
      if (this.active.encounter.failedMaze == false) {
        // run through cards in active stack...
        this.active.stack.cards.forEach((card) => {
          // if it's worth anything, move it into treasure
          if (card.worth > 0) {
            this.placeCard(
              card,
              this.treasure,
              treasureTrack,
              this.active.stack.cards
            );
            this.makeUsable(card);
            // TODO: this.makeUsable(card);
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
      this.active.stack.cards.unshift(lastCard);
      this.active.encounter.failedMaze = false;
      if (this.retreating == false) {
        btnAdvance.removeAttribute("hidden");
      }
      btnRetreat.removeAttribute("hidden");
    }, 2000);
  }

  loseEncounter(cause) {
    updateMessage(cause);
    btnDraw.setAttribute("hidden", true);
    if (this.retreating == false) {
      btnAdvance.removeAttribute("hidden");
    }
    btnRetreat.removeAttribute("hidden");
  }

  flipStack() {
    document
      .querySelectorAll(`[data-depth="${this.depth}"] .card`)
      ?.forEach((element) => {
        element.classList.add("flipped");
      });
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
      if (card.suit == "Major Arcana") {
        gemCount++;
      }
    });
    updateMessage(`You scored ${gemCount}/${this.score}.`);
    if (gemCount == 3 && this.score == 178) {
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

  // TODO: items and skills and treasure drops, oh my!
  makeUsable(card) {
    console.log(`Making ${card.name} usable`);
    switch (card.type) {
      case "treasure":
        document
          .querySelector(`[data-id="${card.id}"]`)
          .addEventListener("click", (event) => {
            this.dropTreasure(event.currentTarget);
          });
        break;
      case "skill":
        // skill logic
        break;
    }
  }

  dropTreasure(treasure) {
    if (this.active.encounter.type != "monster") {
      alert("This card cannot be used!");
      return;
    }
    if (treasure.worth < this.active.encounter.rating) {
      alert(
        `The monster won't be distracted by a treasure worth less than ${this.active.encounter.rating}`
      );
    } else {
      this.placeCard(
        treasure,
        this.active.stack.cards,
        this.active.stack.elem,
        this.treasure
      );
      this.loseEncounter(
        `You drop ${treasure.name} and distract the monster, giving yourself a chance to scurry away.`
      );
    }
  }

  // Card consequences

  discard(shortfall) {
    for (let leftToDiscard = shortfall; leftToDiscard > 0; leftToDiscard--) {
      const timeout = (shortfall - leftToDiscard + 1) * 1400; // repeat at 1.4s intervals
      console.log(
        `${leftToDiscard} remaining to discard. Setting timeout for card #${leftToDiscard} as ${timeout}`
      );
      setTimeout(() => {
        const discard = this.deck.draw();
        showCard(discard);
        if (discard.type == "torch") {
          this.placeCard(discard, this.torches, torchTrack);
          this.burnTorch(discard);
        } else {
          this.discards.push(discard);
        }
      }, timeout);
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
    setTimeout(() => {
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
    }, 600);
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
      const victim = this.companions.pop();
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

let messages = [];

function updateMessage(newMessage, fresh = false) {
  setTimeout(() => {
    if (fresh) {
      messages = [];
    }
    messages.push(newMessage);
    console.log(messages);
    if (messages.length > 4) {
      messages.shift();
    }
    narrator.textContent = "";
    messages.forEach((message) => {
      narrator.textContent += message + " ";
    });
  }, 200);
}

// UI buttons

btnStart.addEventListener("click", () => {
  run = new Run();
  shuffle(run.deck.cardsInDeck);
  console.log(run.deck);
  run.startRun();
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

// initialise

let run = new Run();

setInterval(() => {
  console.log(run);
}, 10000);

//////////// END OF FILE ////////////
