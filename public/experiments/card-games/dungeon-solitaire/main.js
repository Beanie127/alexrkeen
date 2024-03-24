import { DungeonDeck } from "../deck-builder.js";
import { shuffle } from "../utils.js";

// controls
const btnStart = document.querySelector("#btn-start");
const btnDraw = document.querySelector("#btn-draw");
const btnAdvance = document.querySelector("#btn-advance");
const btnRetreat = document.querySelector("#btn-retreat");
const btnTestMode = document.querySelector("#btn-test");
// notifications
const narrator = document.querySelector("#narrator");
const displayCurrentCard = document.querySelector("#display-current-card");
// card placements
const torchTrack = document.querySelector("#torch-track");
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
        isInverted: false,
        type: "",
        suit: "",
        rating: 0,
      },
    };
    this.encounterDefaults = {
      exists: false,
      failedMaze: false,
      isInverted: false,
      type: "",
      suit: "",
      rating: 0,
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

  drawCard() {
    btnDraw.setAttribute("disabled", true);
    setTimeout(() => {
      btnDraw.removeAttribute("disabled");
    }, 2000);
    this.active.card = this.deck.draw();
    showCard(this.active.card);
    this.sortCard();
  }

  placeCard(card, targetArray, targetElement, sourceArray = false) {
    // if the card's already on the table, 'pick it up' i.e. remove from the previous stack/array
    const oldCopy = cardByID(card);
    if (oldCopy != undefined) {
      oldCopy.style.pointerEvents = "none";
      oldCopy.classList.add("fade-out");
    }
    if (sourceArray) {
      const index = sourceArray.indexOf(card);
      sourceArray.splice(index, 1);
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
        case "scroll":
        case "potion":
          // leave these where they are
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
        case "blessing":
          updateMessage(
            `You find ${cardToSort.name} and add it to your hand. Use it wisely.`
          );
          this.placeCard(
            cardToSort,
            this.hand,
            handTrack,
            this.active.stack.cards
          );
          break;
      }
    }, 600);
  }

  // encounter processing

  newTurn() {
    this.turnCount++;
    // reset this.active
    this.active.stack.cards = [];
    this.active.encounter = this.encounterDefaults;
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

  checkParty() {
    if (this.companions.length == 0) return;
    if (
      this.companions.some((companion) => companion.name === "The Magician")
    ) {
      this.active.encounter.isinverted
        ? this.active.encounter.rating++
        : this.active.encounter.rating--;
      console.log(`Encounter rating reduced by The Magician`);
    }
    if (
      this.active.encounter.type == "monster" &&
      this.companions.some((companion) => companion.name === "Page of Swords")
    ) {
      this.active.encounter.isinverted
        ? this.active.encounter.rating++
        : this.active.encounter.rating--;
      console.log(`Encounter rating reduced by the Page of Swords`);
    }
    if (
      this.active.encounter.type == "trap" &&
      this.companions.some(
        (companion) => companion.name === "Page of Pentacles"
      )
    ) {
      this.active.encounter.isinverted
        ? this.active.encounter.rating++
        : this.active.encounter.rating--;
      console.log(`Encounter rating reduced by the Page of Pentacles`);
    }
    if (
      this.active.encounter.type == "door" &&
      this.companions.some((companion) => companion.name === "Page of Wands")
    ) {
      this.active.encounter.isinverted
        ? this.active.encounter.rating++
        : this.active.encounter.rating--;
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
    this.active.encounter.suit = this.active.card.suit;
    updateMessage(`You are confronted by a ${this.active.encounter.type}.`);
    // adjust the active encounter rating depending on what companions you have
    this.checkParty();
    if (
      this.active.stack.cards.some(
        (card) => card.type == "favour" || card.name == "The World"
      )
    ) {
      this.winEncounter();
    }
  }

  continueEncounter() {
    // if the current card meets or beats the encounter rating, you win
    if (
      this.active.card.rank >= this.active.encounter.rating ||
      (this.active.encounter.isInverted &&
        this.active.card.rank <= this.active.encounter.rating)
    ) {
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
          setTimeout(() => {
            if (!this.islost) {
              this.loseEncounter("You retreat, abandoning all gains.");
            }
          }, 650);
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
    this.active.encounter.exists = false;
    btnDraw.setAttribute("hidden", true);
    updateMessage(
      `You overcome the ${this.active.encounter.type} and collect any items and treasure.`
    );

    // if all cards are collectable, make the least valuable treasure card non-collectable
    if (!this.active.stack.cards.find((card) => card.collectable == false)) {
      this.active.stack.cards.sort((a, b) => a.worth - b.worth);
      const remainder = this.active.stack.cards.find((card) => card.worth > 0);
      remainder.collectable = false;
    }

    // delay so everything doesn't pop out of the stack immediately and you can see what's happening
    setTimeout(() => {
      // only take cards if player didn't fail in the maze
      if (this.active.encounter.failedMaze == false) {
        // send companions to companion track and all other collectable cards to the hand
        this.active.stack.cards.forEach((card) => {
          if (card.collectable) {
            if (card.type == "companion") {
              this.placeCard(
                card,
                this.companions,
                companionTrack,
                this.active.stack.cards
              );
              updateMessage(`${card.name} joins your party.`);
            } else {
              this.placeCard(
                card,
                this.hand,
                handTrack,
                this.active.stack.cards
              );
            }
          }
        });
      }

      // reset maze
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
    this.hand.forEach((card) => {
      this.score += card.worth;
      if (
        card.name == "The Star" ||
        card.name == "The Moon" ||
        card.name == "The Sun"
      ) {
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

  // TODO: items & blessings

  makeUsable(card) {
    // replace the card with a clone to remove all existing event listeners
    const target = cardByID(card);
    const clone = target.cloneNode(true);
    target.replaceWith(clone);
    switch (card.type) {
      case "treasure":
        clone.addEventListener("click", () => {
          console.log(this);
          this.dropTreasure(card);
        });
        break;
      case "skill":
        clone.addEventListener("click", () => {
          console.log(this);
          this.useSkill(card);
        });
        break;
      case "blessing":
        clone.addEventListener("click", () => {
          this.useBlessing(card);
        });
        break;
      case "potion":
        clone.addEventListener("click", () => {
          this.drinkPotion(card);
        });
        break;
    }
  }

  useSkill(card) {
    const skill = this.hand.find((obj) => obj.id == card.id);
    if (!this.active.encounter.exists) {
      return;
    }
    if (this.active.encounter.suit == card.suit) {
      card.this.placeCard(
        skill,
        this.active.stack.cards,
        this.active.stack.elem,
        this.hand
      );
      card.collectable = false;
      this.winEncounter();
    } else {
      alert("This skill isn't suitable!");
    }
  }

  useBlessing(card) {
    if (this.corruption.length > 0) {
      updateMessage("You feel a taint on your soul washing away...");
      const corruption = this.corruption.pop();
      this.deck.cardsInDeck.unshift(corruption);
      cardByID(corruption).classList.add("fade-out");
      setTimeout(() => {
        cardByID(corruption).remove();
      }, 1300);
    }
    switch (card.name) {
      case "The Hanged Man":
        this.active.encounter.isInverted = true;
        updateMessage(
          "The Blessing of the Murdered God turns your perspective upside down."
        );
        break;
      case "The World":
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
    card.collectable = false;
    this.placeCard(
      card,
      this.active.stack.cards,
      this.active.stack.elem,
      this.treasure
    );
  }

  drinkPotion(card) {
    switch (card.name) {
      case "Justice":
        if (
          this.active.encounter.type == "monster" ||
          this.active.encounter.type == "door"
        ) {
          updateMessage(
            "The Potion of Giant Strength bolsters you against the current obstacle."
          );
          this.active.encounter.isinverted
            ? this.active.encounter.rating++
            : this.active.encounter.rating--;
        } else {
          error(
            "The Potion of Giant Strength can only be used in encounters against monsters and doors."
          );
        }
        break;
      case "Temperance":
        if (
          this.companions.some((companion) => companion.injured) &&
          window.confirm("Do you want to restore an injured companion?")
        ) {
          const companion = this.companions.find(
            (companion) => companion.injured
          );
          companion.injured = false;
          cardByID(companion).classList.remove("injured-companion");
          updateMessage(`The ${companion.name} is restored to full health.`);
        } else {
          this.hp = 10;
          hpDisplay.textContent += "10 of Cups";
          updateMessage("You are restored to full health.");
        }
        break;
      case "Judgement":
        updateMessage("The Potion of Prescience lets you see what lies ahead.");
        const nextThreeCards = [];
        for (let i = 0; i < 3; i++) {
          nextThreeCards.unshift(this.deck.draw());
        }
        updateMessage(
          `Ahead of you lie ${nextThreeCards[0]}, ${nextThreeCards[1]} and ${nextThreeCards[2]}.`
        );
        nextThreeCards.forEach((futureCard) => {
          if (
            window.confirm(
              `Click 'OK' to play ${futureCard}, or 'Cancel' to send it to the bottom of the deck.`
            )
          ) {
            showCard(futureCard);
            this.active.card = futureCard;
            this.sortCard();
          } else {
            this.deck.cardsInDeck.unshift(futureCard);
          }
        });
        break;
    }
    card.collectable = false;
    this.placeCard(
      card,
      this.active.stack.cards,
      this.active.stack.elem,
      this.treasure
    );
  }

  dropTreasure(card) {
    console.log(`dropTreasure triggered on ${card.name}`);
    if (this.active.encounter.exists == false) {
      return;
    }
    const treasure = this.hand.find((obj) => obj.id == card.id);
    if (this.active.encounter.type != "monster") {
      alert("This card cannot be used!");
    } else if (treasure.worth < this.active.encounter.rating) {
      alert(
        `The monster won't be distracted by a treasure worth less than ${this.active.encounter.rating}`
      );
    } else {
      this.placeCard(
        treasure,
        this.active.stack.cards,
        this.active.stack.elem,
        this.hand
      );
      treasure.collectable = false;
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
    let absorbDamage = false;
    if (this.hand.some((card) => card.name == "Knight of Cups")) {
      absorbDamage = confirm("Use the Knight of Cups?");
    }
    if (absorbDamage) {
      let knightOfCups = this.hand.find(
        (card) => card.name == "Knight of Cups"
      );
      updateMessage("You dodge out of the way, taking no damage.");
      knightOfCups.collectable = false;
      this.placeCard(
        knightOfCups,
        this.active.stack.cards,
        this.active.stack.elem,
        this.hand
      );
      return;
    }
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
          `You lose ${damage} HP as the ${this.active.encounter.type} injures you.`
        );
        this.injureCompanion();
      }
    }, 600);
  }

  injureCompanion() {
    if (this.companions.length == 0) return;
    const victim = this.companions.at(-1);
    if (victim.injured) {
      updateMessage(`${victim.name} dies protecting you.`);
      victim.collectable = false;
      this.placeCard(
        victim,
        this.active.stack.cards,
        this.active.stack.elem,
        this.companions
      );
    }
    victim.injured = true;
    cardByID(victim).classList.add("injured-companion");
  }

  burnTorch() {
    this.torchesRemaining--;
    /// if this is the last torch
    if (this.torchesRemaining == 0) {
      // check if there is a fool in hand and if so
      const fool = this.hand.find((card) => card.name == "The Fool");
      if (fool != undefined) {
        updateMessage("You use your torch of light!");
        this.torchesRemaining++;
        const torch = this.torches.pop();
        this.deck.cardsInDeck.unshift(torch);
        fool.collectable = false;
        this.placeCard(
          fool,
          this.active.stack.cards,
          this.active.stack.elem,
          this.hand
        );
        // remove all elements that match the torch id - necessary because the element is between the torchTrack and the current stack
        cardsByID(torch)?.forEach((element) => element.remove());
      } else {
        this.loseRun(
          "Your last torch goes out. You are lost in the darkness of the dungeon.",
          "torch"
        );
      }
    } else {
      updateMessage(
        `Your torch burns out. You have ${this.torchesRemaining} remaining.`
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
      cardByID(victim).remove();
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

function cardByID(card) {
  return document.querySelector(`[data-id="${card.id}"]`);
}

function cardsByID(card) {
  return document.querySelectorAll(`[data-id="${card.id}"]`);
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

btnTestMode.addEventListener("click", () => {
  console.log("Entering Test Mode");
  run.deck.enterTestMode();
  run.hp = 50;
  console.log(run.deck.cardsInDeck);
});

// initialise

let run = new Run();
console.log(run);

setInterval(() => {
  console.log(run);
  run.hand.forEach((card) => {
    run.makeUsable(card);
  });
}, 10000);

//////////// END OF FILE ////////////
