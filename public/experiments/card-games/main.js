import { TarotDeck } from "./deck-builder.js";

const btnDrawCard = document.querySelector("#draw-card");
const btnShuffle = document.querySelector("#shuffle");
const displayCard = document.querySelector("#display-card");
const drawDisplay = document.querySelector("#draw-display");

const deck = new TarotDeck();

let cardsPlayed = 0;
let currentCard;

function showCurrentCard() {
  drawDisplay.textContent = currentCard.name;
  drawDisplay.classList.add("show-card");
  setTimeout(() => {
    drawDisplay.classList.remove("show-card");
  }, 1201);
}

btnDrawCard.addEventListener("click", (e) => {
  cardsPlayed++;
  currentCard = deck.draw();
  showCurrentCard();
  displayCard.innerHTML += `
  <div class="card fade-in" data-id="${currentCard.id}">${currentCard.name}</div>
  `;
  setTimeout(() => {
    document.querySelector(".fade-in").classList.remove("fade-in");
  }, 1400);
});

btnShuffle.addEventListener("click", (e) => {
  displayCard.innerHTML = ``;
  deck.shuffle();
  cardsPlayed = 0;
});
