import { TarotDeck } from "./deck-builder.js";

const btnDrawCard = document.querySelector("#draw-card");
const btnShuffle = document.querySelector("#shuffle");
const displayCard = document.querySelector("#display-card");

const deck = new TarotDeck();

btnDrawCard.addEventListener("click", (e) => {
  displayCard.innerHTML += `
  <div class="playing-card">${deck.draw().name}</div>
  `;
});

btnShuffle.addEventListener("click", (e) => {
  displayCard.innerHTML = ``;
  deck.shuffle();
});
