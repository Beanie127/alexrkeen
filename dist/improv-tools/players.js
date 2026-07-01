import { pickFrom } from '/js/utilities.js';

const playerList = document.querySelector('#player-list');
const addPlayerForm = document.querySelector('#add-player');
const playerOutput = document.querySelector('#player-output');
const playerOutputList = playerOutput.querySelector('ul');

class Player {
	constructor(name) {
		this.name = name;
		this.uuid = `player-${self.crypto.randomUUID()}`;
	}

	render(target) {
		const li = document.createElement('li');
		li.id = this.uuid;
		li.dataset.name = this.uuid;
		const label = document.createElement('label');
		const input = document.createElement('input');
		input.type = 'checkbox';
		input.value = this.uuid;
		input.checked = true;
		const button = document.createElement('button');
		button.dataset.remove = this.uuid;
		button.innerHTML = '&cross;';
		label.textContent += this.name;
		label.appendChild(input);
		li.appendChild(label);
		li.appendChild(button);
		target.appendChild(li);
	}
}

function savePlayers() {
	const players = playerList.children;
	const data = [];

	for (const player of players) {
		const name = player.querySelector('label').textContent.trim();
		const isChecked = player.querySelector('input').checked;
		data.push({ name: name, isChecked: isChecked });
	}

	localStorage.setItem('players', JSON.stringify(data));
}

function loadPlayers() {
	const data = localStorage.getItem('players');
	if (!data) return;

	console.log(`loadPlayers() found data in localStorage: `, data);

	const players = JSON.parse(data);

	for (const player of players) {
		const el = new Player(player.name);
		el.render(playerList);

		if (player.isChecked == false) {
			const li = document.querySelector(`#${el.uuid}`);
			li.querySelector('input').checked = false;
		}
	}
}

function pickPlayer() {
	const activePlayers = [];

	for (const player of playerList.children) {
		const checkbox = player.querySelector("input[type='checkbox']");
		if (checkbox.checked) activePlayers.push(player);
	}

	if (activePlayers.length == 0) return;

	const nextPlayer = pickFrom(activePlayers);

	const li = document.createElement('li');
	li.textContent = nextPlayer.querySelector('label').textContent;
	playerOutputList.prepend(li);

	nextPlayer.querySelector("input[type='checkbox']").checked = false;
	savePlayers();
}

function addPlayer(e) {
	e.preventDefault();

	const nameInput = addPlayerForm.querySelector('input');

	if (nameInput.value != '') {
		const player = new Player(nameInput.value);
		player.render(playerList);
	}

	nameInput.value = '';
	savePlayers();
}

function removePlayer(name) {
	const toRemove = document.querySelector(`[data-name="${name}"]`);
	if (window.confirm('Are you sure?')) toRemove.remove();
}

function removeAllPlayers() {
	if (confirm('Clear all players?')) {
		playerList.innerHTML = '';
		playerOutput.innerHTML = '';
		savePlayers();
	}
}

function resetCheckboxes() {
	const checkboxes = document.querySelectorAll("input[type='checkbox']");

	for (const checkbox of checkboxes) {
		checkbox.checked = true;
	}

	savePlayers();
}

addPlayerForm.addEventListener('submit', addPlayer);

document.addEventListener('click', handleClick);

function handleClick(e) {
	if (e.target.tagName != 'BUTTON') return;
	if (e.target.dataset.remove) removePlayer(e.target.dataset.remove);
	if (e.target.id == 'reset-checkboxes') resetCheckboxes();
	if (e.target.id == 'remove-all-players') removeAllPlayers();
	if (e.target.id == 'pick-player') pickPlayer();
}

loadPlayers();
