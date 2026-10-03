import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { a as renderComponent, f as renderTemplate, g as maybeRenderHead, w as createComponent } from "./server_ucNOZgWh.mjs";
import "./compiler_D5Hgm0ZG.mjs";
import { t as $$Layout } from "./Layout_DYwVF9yM.mjs";
//#region src/pages/shoebox/writing-exercise.astro
var writing_exercise_exports = /* @__PURE__ */ __exportAll({
	default: () => $$WritingExercise,
	file: () => $$file,
	url: () => $$url
});
var $$WritingExercise = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": "Writing Exercise",
		"description": "Practice your writing skills with a random exercise",
		"data-astro-cid-5oddxsql": true
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<section class="col-center" data-astro-cid-5oddxsql><p data-astro-cid-5oddxsql>Click the button to get a random writing exercise!</p><button id="generate-exercise" data-astro-cid-5oddxsql>Generate Exercise</button><div id="results" data-astro-cid-5oddxsql><h2 data-astro-cid-5oddxsql>Your Challenge</h2><table id="instructions" data-astro-cid-5oddxsql><thead data-astro-cid-5oddxsql><th id="key" data-astro-cid-5oddxsql></th><th id="value" data-astro-cid-5oddxsql></th></thead><tbody data-astro-cid-5oddxsql><tr data-astro-cid-5oddxsql><th data-astro-cid-5oddxsql>Duration</th><td id="duration" data-astro-cid-5oddxsql></td></tr><tr data-astro-cid-5oddxsql><th data-astro-cid-5oddxsql>Genre</th><td id="genre" data-astro-cid-5oddxsql></td></tr><tr data-astro-cid-5oddxsql><th data-astro-cid-5oddxsql>Prompt</th><td id="prompt" data-astro-cid-5oddxsql></td></tr></tbody></table><br data-astro-cid-5oddxsql><div id="countdown-timer" hidden data-astro-cid-5oddxsql>00:00</div><button id="timer-btn" hidden style="display:none" data-astro-cid-5oddxsql>Start the clock!</button></div><textarea name="copy" id="copy" hidden data-astro-cid-5oddxsql>
		</textarea><br data-astro-cid-5oddxsql><span id="word-count" hidden data-astro-cid-5oddxsql></span><button id="save-btn" hidden style="display:none" data-astro-cid-5oddxsql>Save your work?</button></section><script type="module">
		import * as util from '/js/utilities.js';
		import {
			events,
			objects,
			jobs,
			relationships,
			locales,
			emotions,
		} from '/js/data-lists.js';

		const prompts = [
			...events,
			...objects,
			...jobs,
			...relationships,
			...locales,
			...emotions,
		];

		const genres = ['non-fiction', 'fiction', 'autobiographical'];

		const copy = document.querySelector('#copy');

		class Exercise {
			constructor() {
				this.duration;
				this.genre;
				this.prompt;
				this.isActive = false;
			}
		}

		let exercise = {};

		function generateExercise() {
			// generate a new exercise
			exercise = new Exercise();
			exercise.duration = util.bellCurveTween(3, 15);
			exercise.genre = util.pickFrom(genres, true);
			exercise.prompt = util.pickFrom(prompts);

			// render the exercise
			util.updateField('#duration', \`\${exercise.duration} minutes\`);
			util.updateField('#genre', \`\${exercise.genre}\`);
			util.updateField('#prompt', \`\${exercise.prompt}\`);
			util.updateField(
				'#countdown-timer',
				\`\${exercise.duration < 10 ? '0' + exercise.duration : exercise.duration}:00\`
			);

			// set the timer
			exercise.duration = exercise.duration * 60;

			// show controls
			util.setHidden('#copy', false);
			util.setHidden('#timer-btn', false);
			util.setHidden('#countdown-timer', false);
			util.setHidden('#word-count');
		}

		// start exercise
		function startExercise() {
			// check for active exercise and cancel as appropriate
			if (exercise.isActive) {
				const cancel = confirm(
					'You have an active challenge! Are you sure you want to cancel?'
				);
				if (!cancel) {
					return;
				}
				exercise.duration = 0;
				clearInterval(window.timerInterval);
				expireTimer();
			}
			// dom manipulation
			util.updateField('#timer-btn', 'Stop the timer');
			util.setHidden('#generate-exercise');
			//start the timer
			startTimer();
		}

		function downloadResult() {
			// create a file from the copy
			const content = copy.value;
			const blob = new Blob([content], { type: 'plain/text' });
			const fileUrl = URL.createObjectURL(blob);

			// create download link
			const dlLink = document.createElement('a');
			dlLink.setAttribute('href', fileUrl);
			dlLink.setAttribute(
				'download',
				\`\${util.today()} \${exercise.prompt}.md\`
			);
			dlLink.style.display = 'none';
			document.body.appendChild(dlLink);
			dlLink.click();
			document.body.removeChild(dlLink);
		}

		function wordCount(str) {
			return str.split(' ').length;
		}

		// timers
		function startTimer() {
			exercise.isActive = true;
			window.timerInterval = setInterval(() => {
				iterateTimer();
			}, 1000);
		}

		function iterateTimer() {
			if (exercise.isActive == false) {
				console.log('exercise has been stopped or ended');
				clearInterval(window.timerInterval);
			}
			let minutes, seconds;
			minutes = parseInt(exercise.duration / 60, 10);
			seconds = parseInt(exercise.duration % 60, 10);

			minutes = minutes < 10 ? '0' + minutes : minutes;
			seconds = seconds < 10 ? '0' + seconds : seconds;

			util.updateField('#countdown-timer', \`\${minutes}:\${seconds}\`);
			exercise.duration--;
			if (exercise.duration < 0) {
				expireTimer();
			}
		}

		function expireTimer() {
			console.log('ExpireTimer triggered');
			exercise.duration = 0;
			util.updateField('#countdown-timer', "Time's up!");
			exercise.isActive = false;
			util.setHidden('#save-btn', false);
			util.setHidden('#word-count', false);
			util.updateField(
				'#word-count',
				\`Word Count: \${wordCount(copy.value)}\`
			);
			util.setHidden('#generate-exercise', false);
		}
		// Event listeners

		document
			.querySelector('#generate-exercise')
			.addEventListener('click', generateExercise);

		document
			.querySelector('#timer-btn')
			.addEventListener('click', startExercise);
		document
			.querySelector('#save-btn')
			.addEventListener('click', downloadResult);
	<\/script>` })}`;
}, "/home/alexrkeen/Sync/webdev/alexrkeen/src/pages/shoebox/writing-exercise.astro", void 0);
var $$file = "/home/alexrkeen/Sync/webdev/alexrkeen/src/pages/shoebox/writing-exercise.astro";
var $$url = "/shoebox/writing-exercise";
//#endregion
//#region \0virtual:astro:page:src/pages/shoebox/writing-exercise@_@astro
var page = () => writing_exercise_exports;
//#endregion
export { page };
