import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { a as renderComponent, f as renderTemplate, g as maybeRenderHead, w as createComponent } from "./server_ucNOZgWh.mjs";
import { t as getCollection } from "./_astro_content_U2RV8wAY.mjs";
import "./compiler_D5Hgm0ZG.mjs";
import { t as $$Layout } from "./Layout_DYwVF9yM.mjs";
import { t as $$Quote } from "./Quote_as3UGWQH.mjs";
//#region src/pages/404.astro
var _404_exports = /* @__PURE__ */ __exportAll({
	default: () => $$404,
	file: () => $$file,
	url: () => $$url
});
var $$404 = createComponent(async ($$result, $$props, $$slots) => {
	const quotes = await getCollection("quotes");
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": "Page not found!",
		"description": "The page you are looking for could not be found.",
		"data-astro-cid-ibpinaeu": true
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<section class="col-center" data-astro-cid-ibpinaeu><p data-astro-cid-ibpinaeu>The page you are looking for could not be found!</p><p data-astro-cid-ibpinaeu>Your best for finding whatever you're looking for is to <a href="/" data-astro-cid-ibpinaeu>go back to the index</a>.</p><p data-astro-cid-ibpinaeu>Meanwhile, here's some wisdom:</p><div id="quote-display" data-astro-cid-ibpinaeu></div><div hidden id="quote-store" data-astro-cid-ibpinaeu>${quotes.map((quote) => {
		return renderTemplate`${renderComponent($$result, "Quote", $$Quote, {
			"id": quote.id,
			"source": quote.data.source,
			"url": quote.data.url,
			"category": quote.data.category,
			"author": quote.data.author,
			"data-astro-cid-ibpinaeu": true
		})}`;
	})}</div><script type="module">
            const quoteDisplay = document.querySelector("#quote-display");
            const quotes = document.querySelectorAll(".quote");
            const quote = quotes[Math.floor(Math.random() * quotes.length)];
            console.log(quote);
            quoteDisplay.innerHTML = "";
            quoteDisplay.appendChild(quote);
        <\/script></section>` })}`;
}, "/home/alexrkeen/Sync/webdev/alexrkeen/src/pages/404.astro", void 0);
var $$file = "/home/alexrkeen/Sync/webdev/alexrkeen/src/pages/404.astro";
var $$url = "/404";
//#endregion
//#region \0virtual:astro:page:src/pages/404@_@astro
var page = () => _404_exports;
//#endregion
export { page };
