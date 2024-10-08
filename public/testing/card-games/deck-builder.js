import { shuffle } from "./utils.js";

customElements.define(
  "playing-card",
  class extends HTMLElement {
    constructor(rank, suit, name) {
      super();
      if (suit == "Major Arcana") {
        this.name = name;
      } else if (
        rank == "Ace" ||
        rank == "Page" ||
        rank == "Jack" ||
        rank == "Knight" ||
        rank == "Queen" ||
        rank == "King"
      ) {
        this.name = `The ${rank} of ${suit}`;
      } else {
        this.name = `${rank} of ${suit}`;
      }
      this.type = false;
      this.suit = suit;
      this.rank = rank;
      this.value = false;
      this.worth = 0;
      this.id = 0;
      this.encounterType = false;
      this.isCollectable = false;
      this.filename = "";
    }
  }
);

class Card {
  constructor(rank, suit, name) {
    if (suit == "Major Arcana") {
      this.name = name;
    } else if (
      rank == "Ace" ||
      rank == "Page" ||
      rank == "Jack" ||
      rank == "Knight" ||
      rank == "Queen" ||
      rank == "King"
    ) {
      this.name = `The ${rank} of ${suit}`;
    } else {
      this.name = `${rank} of ${suit}`;
    }
    this.type = false;
    this.suit = suit;
    this.rank = rank;
    this.value = false;
    this.worth = 0;
    this.id = 0;
    this.encounterType = false;
    this.isCollectable = false;
    this.filename = "";
  }

  createElem = () => {
    const element = document.createElement("div");
    element.classList.add("card");
    element.dataset.id = this.id;
    element.dataset.name = this.name;
    element.dataset.type = this.type;
    if (this.encounterType !== false) element.dataset.encounterType = this.type;
    element.dataset.suit = this.suit;
    element.dataset.rank = this.rank;
    element.dataset.worth = this.worth;
    element.dataset.isCollectable = this.isCollectable;
    const img = this.createImg();
    element.appendChild(img);
    return element;
  };

  createImg = () => {
    const image = document.createElement("img");
    image.setAttribute(
      "src",
      `https://alexrkeen.com/experiments/card-games/images/${this.filename}.jpg`
    );
    image.setAttribute("title", this.name);
    image.setAttribute("alt", this.name);
    return image;
  };

  placeElem = (target) => {
    const card = this.createElem();
    target.appendChild(card);
    card.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: 600,
      iterations: 1,
    });
  };

  getElem = () => {
    return document.querySelector(`[data-id="${this.id}"]`);
  };

  removeElem = () => {
    const element = this.getElem();
    if (!element) {
      return;
    }
    element.style.pointerEvents = "none";
    let margin;
    element.parentElement.firstChild === element
      ? (margin = "-3ch")
      : (margin = "-20ch");
    element.animate(
      [{ opacity: 1 }, { opacity: 0, marginBlockStart: margin }],
      {
        duration: 600,
        iterations: 1,
      }
    ).onfinish = () => element.remove();
  };

  moveElem = (target) => {
    this.removeElem();
    setTimeout(() => {
      this.placeElem(target);
    }, 500);
  };
}

const parametersFiftyTwo = {
  suits: ["Hearts", "Spades", "Clubs", "Diamonds"],
  ranks: [
    "Ace",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Jack",
    "Queen",
    "King",
  ],
};

const parametersTarot = {
  suits: ["Wands", "Cups", "Swords", "Pentacles"],
  ranks: [
    "Ace",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Page",
    "Knight",
    "Queen",
    "King",
  ],
  majors: [
    "The Fool",
    "The Magician",
    "The High Priestess",
    "The Empress",
    "The Emperor",
    "The Heirophant",
    "The Lovers",
    "The Chariot",
    "Strength",
    "The Hermit",
    "The Wheel of Fortune",
    "Justice",
    "The Hanged Man",
    "Death",
    "The Devil",
    "Temperance",
    "The Tower",
    "The Star",
    "The Moon",
    "The Sun",
    "Judgement",
    "The World",
  ],
};

const parametersDungeon = {
  suits: ["Swords", "Cups", "Pentacles", "Wands"],
  actionRanks: [2, 3, 4, 5, 6, 7, 8, 9, 10],
  basicCards: ["Ace", "Page", "Knight", "Queen", "King"],
  majors: [
    "The Fool",
    "The Magician",
    "The High Priestess",
    "The Empress",
    "The Emperor",
    "The Hierophant",
    "The Lovers",
    "The Chariot",
    "Strength",
    "The Hermit",
    "The Wheel of Fortune",
    "Justice",
    "The Hanged Man",
    "Death",
    "Temperance",
    "The Devil",
    "The Tower",
    "The Star",
    "The Moon",
    "The Sun",
    "Judgement",
    "The World",
  ],
};

class Deck {
  constructor() {
    this.backup = [];
    this.cardsInDeck = [];
    this.currentCard;
  }

  add(card) {
    this.cardsInDeck.push(card);
  }

  shuffle() {
    for (let i = this.cardsInDeck.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [this.cardsInDeck[i], this.cardsInDeck[j]] = [
        this.cardsInDeck[j],
        this.cardsInDeck[i],
      ];
    }
  }

  draw() {
    if (this.cardsInDeck.length == 0) {
      alert("You've run out of cards!");
      return;
    }
    this.currentCard = this.cardsInDeck.pop();
    return this.currentCard;
  }

  reset() {
    this.cardsInDeck = this.backup;
  }
}

class FiftyTwoDeck extends Deck {
  constructor() {
    super();
    parametersFiftyTwo.suits.forEach((suit) => {
      parametersFiftyTwo.ranks.forEach((rank) => {
        const card = new Card(rank, suit);
        if (rank == "Ace") {
          card.type = "Ace";
        } else if (rank == "Jack" || rank == "Queen" || rank == "King") {
          card.type = "Court";
        } else {
          card.type = "Number";
        }
        card.value = 1 + parametersFiftyTwo.ranks.indexOf(rank);
        this.add(card);
      });
    });
    this.cardsInDeck.forEach((card) => {
      card.id = cardsInDeck.indexOf(card) + 1;
    });
    this.backup = this.cardsInDeck;
  }
}

class TarotDeck extends Deck {
  constructor() {
    super();
    parametersTarot.majors.forEach((major) => {
      const rank = parametersTarot.majors.indexOf(major);
      const card = new Card(rank, "Major Arcana", major);
      card.suit = "Major Arcana";
      card.value = card.rank;
      card.filename = `m${rank}`;
      this.add(card);
    });
    parametersTarot.suits.forEach((suit) => {
      parametersTarot.ranks.forEach((rank) => {
        const card = new Card(rank, suit);
        card.value = 1 + parametersTarot.ranks.indexOf(rank);
        switch (rank) {
          case "Ace":
            card.type = "Ace";
            card.filename = `${suit[0].toLowerCase()}a`;
            break;
          case "Page":
            card.filename = `${suit[0].toLowerCase()}p`;
            card.type = "Court";
            break;
          case "Knight":
            card.filename = `${suit[0].toLowerCase()}n`;
            card.type = "Court";
            break;
          case "Queen":
            card.filename = `${suit[0].toLowerCase()}q`;
            card.type = "Court";
            break;
          case "King":
            card.filename = `${suit[0].toLowerCase()}k`;
            card.type = "Court";
            break;
          default:
            card.type = "Number";
            card.filename = `${suit[0].toLowerCase()}${card.value}`;
        }
        this.add(card);
      });
    });
    this.cardsInDeck.forEach((card) => {
      card.id = this.cardsInDeck.indexOf(card) + 1;
    });
    this.backup = this.cardsInDeck;
  }
}

class DungeonDeck extends Deck {
  constructor() {
    super();

    this.cups = [];
    // add the major arcana
    parametersDungeon.majors.forEach((major) => {
      let rank = parametersDungeon.majors.indexOf(major);
      const card = new Card(rank, "Major Arcana", major);
      card.filename = `m${rank}`;
      switch (card.rank) {
        case 0:
          card.type = "scroll";
          break;
        case 1:
          card.type = "companion";
          break;
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
          card.encounterType = "maze";
          card.type = "action";
          break;
        case 11:
        case 14:
        case 20:
          card.type = "potion";
          break;
        case 12:
        case 21:
          card.type = "blessing";
          break;
        case 13:
        case 15:
          card.type = "corruption";
          break;
        case 16:
          card.type = "event";
          break;
        case 17:
        case 18:
        case 19:
          card.type = "treasure";
      }
      switch (card.type) {
        case "scroll":
        case "blessing":
        case "potion":
          card.worth = 6;
          card.isCollectable = true;
          break;
        case "treasure":
          card.worth = 20;
          card.isCollectable = true;
          break;
        case "companion":
          card.isCollectable = true;
          break;
      }
      this.add(card);
    });

    // add Aces, Pages, Knights, Queens, Kings
    parametersDungeon.suits.forEach((suit) => {
      parametersDungeon.basicCards.forEach((rank) => {
        const card = new Card(rank, suit);
        let suitInitial = suit.charAt(0).toLowerCase();
        switch (card.rank) {
          case "Ace":
            card.type = "torch";
            card.filename = `${suitInitial}a`;
            break;
          case "Page":
            card.type = "companion";
            card.isCollectable = true;
            card.filename = `${suitInitial}p`;
            break;
          case "Knight":
            card.type = "skill";
            card.isCollectable = false;
            card.filename = `${suitInitial}n`;
            break;
          case "Queen":
            card.type = "favour";
            card.filename = `${suitInitial}q`;
            break;
          case "King":
            card.type = "treasure";
            card.worth = 10;
            card.isCollectable = true;
            card.filename = `${suitInitial}k`;
            break;
        }
        this.add(card);
      });
    });

    // add all the action cards (except mazes)
    parametersDungeon.suits.forEach((suit) => {
      const suitInitial = suit.charAt(0).toLowerCase();
      parametersDungeon.actionRanks.forEach((rank) => {
        const card = new Card(rank, suit);
        card.filename = `${suitInitial}${rank}`;
        if (suit == "Cups") {
          card.type = "health";
          this.cups.push(card);
          return;
        }
        card.type = "action";
        switch (suit) {
          case "Swords":
            card.encounterType = "monster";
            break;
          case "Pentacles":
            card.encounterType = "trap";
            card.worth = card.rank;
            card.isCollectable = true;
            break;
          case "Wands":
            card.encounterType = "door";
            break;
        }
        this.add(card);
      });
    });

    // give each card a unique id
    this.cardsInDeck.forEach((card) => {
      card.id = this.cardsInDeck.indexOf(card) + 1;
    });
    this.backup = this.cardsInDeck;
  }

  enterTestMode() {
    this.cardsInDeck = this.cardsInDeck.filter(
      (card) =>
        card.name == "The Fool" ||
        card.rank == "Ace" ||
        card.name == "10 of Wands"
    );
    // this.cardsInDeck.sort((a, b) => a.id - b.id);
  }
}

export { Card, Deck, TarotDeck, FiftyTwoDeck, DungeonDeck };
