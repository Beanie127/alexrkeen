import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { a as renderComponent, f as renderTemplate, g as maybeRenderHead, w as createComponent } from "./server_ucNOZgWh.mjs";
import "./compiler_D5Hgm0ZG.mjs";
import { t as $$Layout } from "./Layout_DYwVF9yM.mjs";
//#region src/pages/shoebox/clock.astro
var clock_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Clock,
	file: () => $$file,
	url: () => $$url
});
var $$Clock = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": "Clock",
		"description": "A cool clock",
		"data-astro-cid-ulchpgu4": true
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<main class="col-center" data-astro-cid-ulchpgu4><div id="clock" data-astro-cid-ulchpgu4><div id="minute" data-astro-cid-ulchpgu4></div><div id="hour" data-astro-cid-ulchpgu4></div><div id="second" data-astro-cid-ulchpgu4></div><div id="center-spot" data-astro-cid-ulchpgu4></div></div></main><script>
		const clock = document.querySelector('#clock');
		function updateClock() {
			const moment = new Date();
			console.log(moment);
			const minute = moment.getMinutes();
			const hour = moment.getHours();
			const second = moment.getSeconds();
			clock.style.setProperty('--hour', hour);
			clock.style.setProperty('--minute', minute);
			clock.style.setProperty('--second', second);
		}

		updateClock();
		setInterval(updateClock, 500);
	<\/script>` })}`;
}, "/home/alexrkeen/Sync/webdev/alexrkeen/src/pages/shoebox/clock.astro", void 0);
var $$file = "/home/alexrkeen/Sync/webdev/alexrkeen/src/pages/shoebox/clock.astro";
var $$url = "/shoebox/clock";
//#endregion
//#region \0virtual:astro:page:src/pages/shoebox/clock@_@astro
var page = () => clock_exports;
//#endregion
export { page };
