import { C as createAstro, a as renderComponent, f as renderTemplate, g as maybeRenderHead, o as Fragment, v as addAttribute, w as createComponent } from "./server_ucNOZgWh.mjs";
import "./compiler_D5Hgm0ZG.mjs";
//#region src/components/Quote.astro
createAstro("https://astro.build");
var $$Quote = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Quote;
	const { id, author, url, source, category } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<figure class="quote" data-astro-cid-rynpovno><blockquote${addAttribute(category, "class")} data-astro-cid-rynpovno>${id}</blockquote><figcaption data-astro-cid-rynpovno><cite data-astro-cid-rynpovno><span class="author" data-astro-cid-rynpovno>${author}</span><div class="source" data-astro-cid-rynpovno>${url ? renderTemplate`<a${addAttribute(url, "href")} data-astro-cid-rynpovno>${source}</a>` : renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`${source}` })}`}</div></cite></figcaption></figure>`;
}, "/home/alexrkeen/Sync/webdev/alexrkeen/src/components/Quote.astro", void 0);
//#endregion
export { $$Quote as t };
