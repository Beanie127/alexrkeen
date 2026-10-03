import { C as createAstro, _ as renderHead, f as renderTemplate, l as renderSlot, v as addAttribute, w as createComponent } from "./server_ucNOZgWh.mjs";
import "./compiler_D5Hgm0ZG.mjs";
//#region src/layouts/Layout.astro
createAstro("https://astro.build");
var $$Layout = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Layout;
	const { title, description } = Astro.props;
	return renderTemplate`<html lang="en"><head><title>
			${title == "Alex Keen" ? title : `${title} | Alex Keen`}
		</title><meta charset="UTF-8"><meta name="description"${addAttribute(description, "content")}><meta name="viewport" content="width=device-width,"><link rel="icon" href="/images/favicon.svg" type="image/svg+xml"><meta name="generator"${addAttribute(Astro.generator, "content")}>${renderHead($$result)}</head><body><header><a id="home-link" href="/" title="home"><span class="visually-hidden">Home</span><img width="100" src="/images/favicon.svg" alt="A monogram of the letters A K in a circle"></a><h1>${title}</h1></header>${renderSlot($$result, $$slots["default"])}</body></html>`;
}, "/home/alexrkeen/Sync/webdev/alexrkeen/src/layouts/Layout.astro", void 0);
//#endregion
export { $$Layout as t };
