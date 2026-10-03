import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { a as renderComponent, f as renderTemplate, g as maybeRenderHead, w as createComponent } from "./server_ucNOZgWh.mjs";
import "./compiler_D5Hgm0ZG.mjs";
import { t as $$Layout } from "./Layout_DYwVF9yM.mjs";
//#region src/pages/shoebox/design-exercise.astro
var design_exercise_exports = /* @__PURE__ */ __exportAll({
	default: () => $$DesignExercise,
	file: () => $$file,
	url: () => $$url
});
var $$DesignExercise = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": "Graphic Design Exercise",
		"description": "Test your graphic design skills with a randomised challenge",
		"data-astro-cid-eunulw44": true
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<section class="col-center" data-astro-cid-eunulw44><p data-astro-cid-eunulw44>Click the button to get a random graphic design challenge!</p><button id="btn-generate-challenge" data-astro-cid-eunulw44>Generate challenge</button><div id="results" data-astro-cid-eunulw44><h2 data-astro-cid-eunulw44>Your Challenge</h2><table id="instructions" data-astro-cid-eunulw44><tr data-astro-cid-eunulw44><th data-astro-cid-eunulw44>Time</th><td id="duration" data-astro-cid-eunulw44></td></tr><tr data-astro-cid-eunulw44><th data-astro-cid-eunulw44>Format</th><td id="dimensions" data-astro-cid-eunulw44></td></tr><tr data-astro-cid-eunulw44><th data-astro-cid-eunulw44>Aesthetic</th><td id="aesthetic" data-astro-cid-eunulw44></td></tr><tr data-astro-cid-eunulw44><th data-astro-cid-eunulw44>Prompts</th><td id="prompts" data-astro-cid-eunulw44></td></tr><tr data-astro-cid-eunulw44><th data-astro-cid-eunulw44>Primary colour</th><td id="color" data-astro-cid-eunulw44></td></tr></table></div><div id="color-display" data-astro-cid-eunulw44></div><div id="countdown-timer" data-astro-cid-eunulw44>00:00</div><button id="btn-start-timer" data-astro-cid-eunulw44>Start the clock!</button></section><script type="module">
		const btnGenerateChallenge = document.querySelector(
			'#btn-generate-challenge',
		);
		const btnStartTimer = document.querySelector('#btn-start-timer');
		const colorDisplay = document.querySelector('#color-display');
		const countdownTimer = document.querySelector('#countdown-timer');

		import { layouts, aesthetics, prompts } from '/js/data-lists.js';

		class Challenge {
			constructor() {
				this.duration;
				this.dimensions;
				this.aesthetic;
				this.prompts;
				this.color;
				this.isActive = false;
			}
		}
		let challenge = {};

		// Generating the challenge
		function generateChallenge() {
			if (challenge.isActive) {
				const cancel = confirm(
					'You have an active challenge! Are you sure you want to cancel?',
				);
				if (!cancel) {
					return;
				}
				challenge.duration = 0;
				clearInterval(window.timerInterval);
			}

			btnStartTimer.textContent = 'Start the clock!';

			challenge = new Challenge();

			challenge.duration = randomIntTween(1, 20);

			challenge.dimensions = pickFrom(layouts);
			if (challenge.dimensions == 'other') {
				const x = bellCurveTween(10, 100);
				const y = bellCurveTween(10, 100);
				challenge.dimensions = \`\${x}cm &times; \${y}cm\`;
			}

			challenge.aesthetic = pickFrom(aesthetics);

			challenge.prompts = \`"\${pickFrom(prompts)}", "\${pickFrom(
				prompts,
			)}" or "\${pickFrom(prompts)}"\`;

			challenge.color = \`hsl(\${randomIntTween(0, 360)} \${randomIntTween(
				0,
				100,
			)}% \${randomIntTween(0, 100)}%)\`;

			updateField('#duration', \`\${challenge.duration} minutes\`);
			updateField('#dimensions', challenge.dimensions);
			updateField('#aesthetic', challenge.aesthetic);
			updateField('#prompts', challenge.prompts);
			updateField('#color', challenge.color);
			colorDisplay.style = \`background: \${challenge.color}\`;
			updateField(
				'#countdown-timer',
				\`\${
					challenge.duration < 10 ?
						'0' + challenge.duration
					:	challenge.duration
				}:00\`,
			);
			challenge.duration = challenge.duration * 60;
		}

		// timer stuff
		function startTimer() {
			challenge.isActive = true;
			btnStartTimer.textContent = 'Stop the clock!';
			window.timerInterval = setInterval(iterateTimer, 1000);
		}

		function iterateTimer() {
			if (challenge.isActive == false) {
				console.log('challenge has been stopped or ended');
				clearInterval(window.timerInterval);
			}
			let minutes, seconds;
			minutes = parseInt(challenge.duration / 60, 10);
			seconds = parseInt(challenge.duration % 60, 10);

			minutes = minutes < 10 ? '0' + minutes : minutes;
			seconds = seconds < 10 ? '0' + seconds : seconds;

			countdownTimer.textContent = minutes + ':' + seconds;
			challenge.duration--;
			if (challenge.duration < 0) {
				expireTimer();
			}
		}

		function expireTimer() {
			console.log('ExpireTimer triggered');
			challenge.duration = 0;
			countdownTimer.textContent = "Time's up!";
			challenge.isActive = false;
		}

		// Random generation stuff
		function randomIntTween(min, max) {
			const range = max - min;
			const result = min + Math.floor(Math.random() * range);
			return result;
		}

		function bellCurveTween(min, max) {
			return Math.floor(
				(randomIntTween(min, max) + randomIntTween(min, max)) / 2,
			);
		}

		function pickFrom(array, bellCurve = false) {
			let index;
			if (bellCurve) {
				index = bellCurveTween(0, array.length);
			} else {
				index = randomIntTween(0, array.length);
			}
			return array[index];
		}

		// DOM manipulation
		function updateField(target, innerHTML) {
			document.querySelector(target).innerHTML = innerHTML;
		}

		// adding event listeners
		btnGenerateChallenge.addEventListener('click', generateChallenge);

		btnStartTimer.addEventListener('click', () => {
			// if it's clicked while a timer is in play, check if they want to cancel?
			if (challenge.isActive == true) {
				if (confirm('Do you want to cancel the challenge?'))
					expireTimer();
				return;
			}
			startTimer(challenge.duration * 60);
		});
	<\/script>` })}`;
}, "/home/alexrkeen/Sync/webdev/alexrkeen/src/pages/shoebox/design-exercise.astro", void 0);
var $$file = "/home/alexrkeen/Sync/webdev/alexrkeen/src/pages/shoebox/design-exercise.astro";
var $$url = "/shoebox/design-exercise";
//#endregion
//#region \0virtual:astro:page:src/pages/shoebox/design-exercise@_@astro
var page = () => design_exercise_exports;
//#endregion
export { page };
