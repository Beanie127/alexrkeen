import { TarotDeck } from "./deck-builder.js";
import { renderCard } from "./utils.js";

const btnDraw = document.querySelector("#btn-draw");
const btnReset = document.querySelector("#btn-reset");
const cardTray = document.querySelector("#card-tray");
const displayCurrentCard = document.querySelector("#display-current-card");

function showCurrentCard() {
  displayCurrentCard.innerHTML = `<img src="./images/${deck.currentCard.filename}.jpg" title="${deck.currentCard.name}" alt="${deck.currentCard.name}"/>`;
  displayCurrentCard.classList.add("show-card");
  setTimeout(() => {
    displayCurrentCard.classList.remove("show-card");
  }, 1201);
}

// Draw the Tarot features

const deck = new TarotDeck();
deck.shuffle();

btnDraw.addEventListener("click", () => {
  btnDraw.setAttribute("disabled", true);
  deck.currentCard = deck.draw();
  showCurrentCard();
  deck.currentCard.placeElem(cardTray);
  setTimeout(() => {
    btnDraw.removeAttribute("disabled");
  }, 1401);
});

btnReset.addEventListener("click", () => {
  cardTray.innerHTML = ``;
  deck.reset();
});
