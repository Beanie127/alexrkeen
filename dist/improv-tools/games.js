import { pickFrom } from '/js/utilities.js';
import { improvGames } from '/js/data-lists.js';
const gameGenerator = document.querySelector('#game-generator');
const gameReset = document.querySelector('#game-reset');
const gameOutput = document.querySelector('#current-game');
const pastGames = [];

function save() {
	const data = {};
	data.pastGames = pastGames;
	const checkedBoxes = Array.from(
		gameGenerator.querySelectorAll('input:checked'),
	);
	data.checkedBoxes = checkedBoxes.map((box) => box.value);
	localStorage.setItem('game-data', JSON.stringify(data));
}

function load() {
	const data = JSON.parse(localStorage.getItem('game-data'));
	console.log('Loaded: ', data);
	if (!data) return;
	pastGames.length = 0;
	if (data.pastGames) pastGames.push(data.pastGames);
	data.checkedBoxes.forEach((boxValue) => {
		gameGenerator.querySelector(`input[value="${boxValue}"]`).checked;
	});
}

function reset() {
	pastGames.length = 0;
	gameOutput.setAttribute('hidden', 'hidden');
}

gameReset.addEventListener('click', (e) => {
	e.preventDefault();
	if (confirm('Reset the game list?')) reset();
	save();
});

function getExclusions(attribute) {
	const exclusions = [];
	// look for all the checkboxes that match the attribute searched
	const checkboxes = gameGenerator.querySelectorAll(`[name="${attribute}"]`);
	// if the attribute isn't checked, add that to the list of exclusions
	checkboxes.forEach((checkbox) => {
		if (!checkbox.checked) exclusions.push(checkbox.value);
	});
	// console.log('Excluding games where', attribute, 'matches', exclusions);
	return exclusions;
}

function filterGames(tags, difficulties, playerCounts) {
	// create an array of invalid games, starting with games that have already gone
	// add any games which exceed preferred difficulty or max player count
	// check if game has any tags which match excluded tags
	const invalidGames = [...pastGames];
	improvGames.forEach((game) => {
		game.tags.forEach((tag) => {
			if (tags.includes(tag)) {
				invalidGames.push(game);
			}
		});
		if (difficulties.includes(game.difficulty.toString()))
			invalidGames.push(game);
		if (playerCounts.includes(game.playerCount.toString()))
			invalidGames.push(game);
	});
	// generate valid games list
	const validGames = improvGames.filter((game) => !invalidGames.includes(game));
	return validGames;
}

function pickGame() {
	// get lists of excluded tags/difficulties/player counts
	const excludedTags = getExclusions('tag');
	const excludedDifficulties = getExclusions('difficulty');
	const excludedPlayerCounts = getExclusions('playerCount');
	// produce list of valid games
	const validGames = filterGames(
		excludedTags,
		excludedDifficulties,
		excludedPlayerCounts,
	);
	// catch error: no games
	if (validGames.length == 0) return;
	// render a game at random from the list of valid games
	renderGame(pickFrom(validGames));
}

function renderGame(game) {
	// make sure the game output is visible
	gameOutput.removeAttribute('hidden');
	// render the details of the new game
	gameGenerator.querySelector('#game-name').textContent = game.name;
	gameGenerator.querySelector('#game-player-count').textContent =
		game.playerCount;
	const description = gameGenerator.querySelector('#game-description');
	// if the game has a description field, show it
	if (game.description) {
		description.removeAttribute('hidden');
		description.innerHTML = game.description;
	} else {
		description.setAttribute('hidden', 'hidden');
	}
	pastGames.push(game);
}

gameGenerator.addEventListener('submit', (e) => {
	e.preventDefault();
	pickGame();
	save();
});

load();
