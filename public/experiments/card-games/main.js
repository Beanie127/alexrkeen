import { TarotDeck } from "./deck-builder.js";
import { buildCard } from "./utils.js";

const drawCard = document.querySelector("#draw-card");
const shuffle = document.querySelector("#shuffle");
const cardTray = document.querySelector("#card-tray");
const displayCurrentCard = document.querySelector("#display-current-card");

function showCurrentCard() {
  displayCurrentCard.textContent = deck.currentCard.name;
  displayCurrentCard.classList.add("show-card");
  setTimeout(() => {
    displayCurrentCard.classList.remove("show-card");
  }, 1201);
}

// Draw the Tarot features

const deck = new TarotDeck();

drawCard.addEventListener("click", (e) => {
  drawCard.setAttribute("disabled", true);
  deck.currentCard = deck.draw();
  showCurrentCard();
  cardTray.innerHTML += buildCard(deck.currentCard);
  document
    .querySelector(`[data-id="${deck.currentCard.id}"`)
    .classList.add("fade-in");
  setTimeout(() => {
    document.querySelector(".fade-in").classList.remove("fade-in");
  }, 1400);
  setTimeout(() => {
    drawCard.setAttribute("disabled", false);
  }, 1401);
});

shuffle.addEventListener("click", (e) => {
  cardTray.innerHTML = ``;
  deck.shuffle();
});
