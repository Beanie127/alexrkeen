import randFromArray from "./utilities.js";

const playerList = document.querySelector("#player-list");
const addPlayerForm = document.querySelector("#add-player");
const playerOutput = document.querySelector("#player-output");

class Player {
  constructor(name) {
    this.li = document.createElement("li");

    this.checkbox = document.createElement("input");
    this.checkbox.setAttribute("type", "checkbox");
    this.li.appendChild(this.checkbox);

    this.label = document.createElement("label");
    this.label.textContent = name;
    this.li.appendChild(this.label);

    this.xButton = document.createElement("button");
    this.xButton.innerHTML = `&cross;`;
    this.li.appendChild(this.xButton);

    this.xButton.addEventListener("click", () => {
      this.removePlayer();
    });
  }
  addPlayer() {
    playerList.appendChild(this.li);
  }
  removePlayer() {
    if (window.confirm("Are you sure?")) this.li.remove();
  }
}

addPlayerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const nameInput = addPlayerForm.querySelector("input");
  if (nameInput.value != "") {
    const newPlayer = new Player(nameInput.value);
    newPlayer.addPlayer();
  }
  nameInput.value = "";
});

document.querySelector("#pick-player").addEventListener("click", () => {
  const players = playerList.children;
  const activePlayers = [];
  for (const player of players) {
    const checkbox = player.querySelector("input[type='checkbox']");
    if (checkbox.checked) continue;
    activePlayers.push(player);
  }
  if (activePlayers.length == 0) return;

  const nextPlayer = randFromArray(activePlayers);
  playerOutput.textContent =
    "The next player is: " + nextPlayer.querySelector("label").textContent;

  nextPlayer.querySelector("input[type='checkbox']").checked = true;
});

document.querySelector("#remove-all-players").addEventListener("click", () => {
  if (confirm("Clear all players?")) playerList.innerHTML = "";
});

document.querySelector("#reset-checkboxes").addEventListener("click", () => {
  const checkboxes = document.querySelectorAll("input[type='checkbox']");
  for (const checkbox of checkboxes) {
    checkbox.checked = false;
  }
});
