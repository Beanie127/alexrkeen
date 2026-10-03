import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { a as renderComponent, f as renderTemplate, g as maybeRenderHead, w as createComponent } from "./server_ucNOZgWh.mjs";
import "./compiler_D5Hgm0ZG.mjs";
import { t as $$Layout } from "./Layout_DYwVF9yM.mjs";
//#region src/pages/colophon.astro
var colophon_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Colophon,
	file: () => $$file,
	url: () => $$url
});
var $$Colophon = createComponent(($$result, $$props, $$slots) => {
	const currentYear = (/* @__PURE__ */ new Date()).getFullYear().toString();
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": "Colophon",
		"description": "How the sausage is made."
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="col-center"><p>This site is hand-coded in HTML, CSS and a smidge of JS.</p><p>It's built using a static site generator called <a href="https://astro.build" rel="noopener noreferrer" target="_blank">Astro</a>. Astro exports raw HTML and CSS with data-attributes for styling, which makes for a clean and fast site without loading any unnecessary JS. I mostly use it to keep the layout & navigation consistent across pages.</p><p>It's typeset in <a href="https://github.com/Fonthausen/CrimsonPro" rel="noopener noreferrer" target="_blank">Crimson Pro</a>.</p><p>The whole site is &copy; Alex R. Keen 2021&ndash;<span id="current-year">${currentYear}</span></p></div>` })}<script>
	const year = document.querySelector('#current-year');
	const currentYear = new Date().getFullYear().toString();
	year.textContent = currentYear;
<\/script>`;
}, "/home/alexrkeen/Sync/webdev/alexrkeen/src/pages/colophon.astro", void 0);
var $$file = "/home/alexrkeen/Sync/webdev/alexrkeen/src/pages/colophon.astro";
var $$url = "/colophon";
//#endregion
//#region \0virtual:astro:page:src/pages/colophon@_@astro
var page = () => colophon_exports;
//#endregion
export { page };
