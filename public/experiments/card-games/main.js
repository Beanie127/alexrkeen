import { TarotDeck } from "./deck-builder.js";
import { renderCard } from "./utils.js";

const btnDraw = document.querySelector("#btn-draw");
const btnReset = document.querySelector("#btn-reset");
const cardTray = document.querySelector("#card-tray");
const displayCurrentCard = document.querySelector("#display-current-card");

function showCurrentCard() {
  displayCurrentCard.innerHTML = `<img src="./images/${deck.currentCard.filename}.jpg" title="${deck.currentCard.name}" alt="${deck.currentCard.name}"></img>`;
  displayCurrentCard.classList.add("show-card");
  setTimeout(() => {
    displayCurrentCard.classList.remove("show-card");
  }, 1201);
}

// Draw the Tarot features

const deck = new TarotDeck();
deck.shuffleDeck();

btnDraw.addEventListener("click", () => {
  btnDraw.setAttribute("disabled", true);
  deck.currentCard = deck.draw();
  showCurrentCard();
  cardTray.innerHTML += renderCard(deck.currentCard);
  document
    .querySelector(`[data-id="${deck.currentCard.id}"`)
    .classList.add("fade-in");
  setTimeout(() => {
    document.querySelector(".fade-in").classList.remove("fade-in");
  }, 1400);
  setTimeout(() => {
    btnDraw.removeAttribute("disabled");
  }, 1401);
});

btnReset.addEventListener("click", () => {
  cardTray.innerHTML = ``;
  deck.reset();
});
