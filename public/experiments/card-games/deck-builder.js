import { getRandomFromArray } from "./utils.js";

class Card {
  constructor(rank, suit, name) {
    if (suit == "Major Arcana") {
      this.name = `${rank}. ${name}`;
    } else {
      this.name = `${rank} of ${suit}`;
    }
    this.type = false;
    this.suit = suit;
    this.rank = rank;
    this.value = false;
    this.id = 0;
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

class Deck {
  constructor() {
    this.backup = [];
    this.cardsInDeck = [];
    this.currentCard;
  }

  draw() {
    if (this.cardsInDeck.length == 0) {
      alert("You've run out of cards!");
      return;
    }
    this.currentCard = getRandomFromArray(this.cardsInDeck);
    this.cardsInDeck = this.cardsInDeck.filter(
      (card) => card != this.currentCard
    );
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
        this.cardsInDeck.push(card);
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
      card.type = "Major Arcana";
      this.cardsInDeck.push(card);
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
        this.cardsInDeck.push(card);
      });
    });
    this.cardsInDeck.forEach((card) => {
      card.id = this.cardsInDeck.indexOf(card) + 1;
    });
    this.backup = this.cardsInDeck;
  }
}

export {
  Card,
  Deck,
  TarotDeck,
  FiftyTwoDeck,
  parametersFiftyTwo,
  parametersTarot,
};
