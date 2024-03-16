import { TarotDeck } from "./deck-builder.js";

const btnDrawCard = document.querySelector("#draw-card");
const btnShuffle = document.querySelector("#shuffle");
const displayCard = document.querySelector("#display-card");

const deck = new TarotDeck();

let cardsPlayed = 0;

btnDrawCard.addEventListener("click", (e) => {
  cardsPlayed++;
  displayCard.innerHTML += `
  <div class="playing-card place-card" data-index="${cardsPlayed}">${
    deck.draw().name
  }</div>
  `;
  setTimeout(() => {
    document.querySelector(".place-card").classList.remove("place-card");
  }, 601);
});

btnShuffle.addEventListener("click", (e) => {
  displayCard.innerHTML = ``;
  deck.shuffle();
  cardsPlayed = 0;
});
