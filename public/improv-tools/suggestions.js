import {
	events,
	activities,
	objects,
	jobs,
	locales,
	emotions,
	relationships,
	stories,
} from '/js/data-lists.js';
import { pickFrom, capitalise } from '/js/utilities.js';

const promptGenerator = document.querySelector('#prompt-generator');
const suggestionOutput = document.querySelector('#suggestion-output');
const suggestionOutputList = suggestionOutput.querySelector('ul');

function getPromptList(prompt) {
	let result;
	switch (prompt) {
		case 'event':
			result = events;
			break;
		case 'activity':
			result = activities;
			break;
		case 'object':
			result = objects;
			break;
		case 'job':
			result = jobs;
			break;
		case 'location':
			result = locales;
			break;
		case 'emotion':
			result = emotions;
			break;
		case 'relationship':
			result = relationships;
			break;
		case 'story':
			result = stories;
			break;
		case 'any':
		default:
			result = [
				...events,
				...activities,
				...objects,
				...jobs,
				...locales,
				...emotions,
				...relationships,
				...stories,
			];
	}
	return result;
}

promptGenerator.addEventListener('submit', (e) => {
	e.preventDefault();
	console.log('picking a prompt');

	const promptList = getPromptList(promptGenerator.type.value);
	const li = document.createElement('li');
	li.textContent = capitalise(pickFrom(promptList));
	suggestionOutputList.prepend(li);
});
