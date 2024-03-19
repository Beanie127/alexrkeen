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

const parametersDungeon = {
  suits: ["Swords", "Cups", "Coins", "Wands", "Major Arcana"],
  actionValues: [2, 3, 4, 5, 6, 7, 8, 9, 10],
  basicCards: ["Ace", "Page", "Knight", "Queen", "King"],
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
    // add all the action cards
    parametersDungeon.suits.forEach((suit) => {
      parametersDungeon.actionValues.forEach((value) => {
        const card = new Card(value, suit);
        card.challenge;
        switch (suit) {
          case "Swords":
            card.challenge.monster;
          case "Coins":
            card.challenge.trap;
            card.worth = value;
          case "Wands":
            card.challenge.door;
          case "Major Arcana":
            card.challenge.maze;
        }
        this.add(card);
      });
    });
    // add Aces, Pages, Knights, Queens, Kings
    parametersDungeon.basicCards.forEach((rank) => {
      parametersDungeon.suits.forEach((suit) => {
        if ((suit = "Major Arcana")) {
          return;
        }
        const card = new Card(rank, suit);
        switch (rank) {
          case "Ace":
            card.torch;
          case "Page":
            card.companion;
          case "Knight":
            card.skill;
          case "Queen":
            card.favour;
          case "King":
            card.hoard;
            card.worth = 10;
        }
        this.add(card);
      });
    });
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
