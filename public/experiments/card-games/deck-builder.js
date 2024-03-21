import { getRandomFromArray } from "./utils.js";

class Card {
  constructor(rank, suit, name) {
    if (suit == "Major Arcana") {
      this.name = name;
    } else {
      this.name = `${rank} of ${suit}`;
    }
    this.type = false;
    this.suit = suit;
    this.rank = rank;
    this.value = false;
    this.worth = 0;
    this.id = 0;
    this.encounter = {};
  }
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
    "The Heirophant",
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
  draw(fn) {
    if (this.cardsInDeck.length == 0) {
      alert("You've run out of cards!");
      return;
    }
    this.currentCard = getRandomFromArray(this.cardsInDeck);
    console.log(this.currentCard);
    this.cardsInDeck = this.cardsInDeck.filter(
      (card) => card != this.currentCard
    );
    if (fn) {
      fn(this.currentCard);
      return;
    }
    return this.currentCard;
  }

  shuffle() {
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
      this.add(card);
    });
    parametersTarot.suits.forEach((suit) => {
      parametersTarot.ranks.forEach((rank) => {
        const card = new Card(rank, suit);
        if (rank == "Ace") {
          card.type = "Ace";
        } else if (
          rank == "Page" ||
          rank == "Knight" ||
          rank == "Queen" ||
          rank == "King"
        ) {
          card.type = "Court";
        } else {
          card.type = "Number";
        }
        card.value = 1 + parametersTarot.ranks.indexOf(rank);
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

    // add Aces, Pages, Knights, Queens, Kings
    parametersDungeon.suits.forEach((suit) => {
      parametersDungeon.basicCards.forEach((rank) => {
        const card = new Card(rank, suit);
        switch (card.rank) {
          case "Ace":
            card.type = "torch";
            break;
          case "Page":
            card.type = "companion";
            break;
          case "Knight":
            card.type = "skill";
            break;
          case "Queen":
            card.type = "favour";
            break;
          case "King":
            card.type = "treasure";
            card.worth = 10;
            break;
        }
        this.add(card);
      });
    });

    // add all the action cards (except mazes)
    parametersDungeon.suits.forEach((suit) => {
      // ignore cups
      if (suit == "Cups") {
        return;
      }
      parametersDungeon.actionRanks.forEach((rank) => {
        const card = new Card(rank, suit);
        card.type = "action";
        switch (suit) {
          case "Swords":
            card.encounter.type = "monster";
            break;
          case "Pentacles":
            card.encounter.type = "trap";
            card.worth = card.rank;
            break;
          case "Wands":
            card.encounter.type = "door";
            break;
        }
        this.add(card);
      });
    });

    // add the major arcana
    parametersDungeon.majors.forEach((major) => {
      let rank = parametersDungeon.majors.indexOf(major);
      const card = new Card(rank, "Major Arcana", major);
      switch (card.rank) {
        case 0:
        case 11:
        case 14:
        case 20:
          card.type = "item";
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
          card.encounter.type = "maze";
          card.type = "action";
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
          card.worth = 20;
      }
      this.add(card);
    });
    // give each card a unique id
    this.cardsInDeck.forEach((card) => {
      card.id = this.cardsInDeck.indexOf(card) + 1;
    });
    this.backup = this.cardsInDeck;
  }
}

export { Card, Deck, TarotDeck, FiftyTwoDeck, DungeonDeck };
