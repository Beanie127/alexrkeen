import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { a as renderComponent, f as renderTemplate, g as maybeRenderHead, w as createComponent } from "./server_ucNOZgWh.mjs";
import "./compiler_D5Hgm0ZG.mjs";
import { t as $$Layout } from "./Layout_DYwVF9yM.mjs";
//#region src/pages/writing/index.astro
var writing_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => $$url
});
var $$Index = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": "Writing",
		"description": "",
		"data-astro-cid-67lgijtc": true
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<section id="essays" class="col-breakout" data-astro-cid-67lgijtc><h2 data-astro-cid-67lgijtc>Articles on this site</h2><ul class="unmarked-list" data-astro-cid-67lgijtc><li data-astro-cid-67lgijtc><span class="date" data-astro-cid-67lgijtc>2023-08-08</span><a href="/writing/flyering-edinburgh" data-astro-cid-67lgijtc>How to flyer at the Edinburgh Fringe</a></li><li data-astro-cid-67lgijtc><span class="date" data-astro-cid-67lgijtc>2023-07-28</span><a href="/writing/below-the-algorithm" data-astro-cid-67lgijtc>Living Below the Algorithm</a></li></ul></section><section style="view-transition-name: other;" class="col-breakout" data-astro-cid-67lgijtc><h2 data-astro-cid-67lgijtc>External publications</h2><ul class="card-container" data-astro-cid-67lgijtc><li data-astro-cid-67lgijtc><h3 data-astro-cid-67lgijtc>Alphabet of Hope</h3><p data-astro-cid-67lgijtc>An anthology of stories written for a teen audience by members of the LGBTQ+ community from around the world. I contributed my coming out story.</p><a href="https://www.amazon.co.uk/Alphabet-Hope-Mr-Trevor-Ritchie/dp/1777568803/" data-astro-cid-67lgijtc><em data-astro-cid-67lgijtc>Alphabet of Hope</em> on Amazon</a></li><li data-astro-cid-67lgijtc><h3 data-astro-cid-67lgijtc>Steel City Improv</h3><p data-astro-cid-67lgijtc>A blog about improv written by Sheffield improvisers. I’m the founder, lead editor and occasional contributor.</p><a href="https://medium.com/steel-city-improv" data-astro-cid-67lgijtc><em data-astro-cid-67lgijtc>Steel City Improv</em> on Medium.com</a></li></ul></section>` })}`;
}, "/home/alexrkeen/Sync/webdev/alexrkeen/src/pages/writing/index.astro", void 0);
var $$file = "/home/alexrkeen/Sync/webdev/alexrkeen/src/pages/writing/index.astro";
var $$url = "/writing";
//#endregion
//#region \0virtual:astro:page:src/pages/writing/index@_@astro
var page = () => writing_exports;
//#endregion
export { page };
