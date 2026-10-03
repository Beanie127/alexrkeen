import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { a as renderComponent, f as renderTemplate, g as maybeRenderHead, n as renderScript, v as addAttribute, w as createComponent } from "./server_ucNOZgWh.mjs";
import { t as getCollection } from "./_astro_content_U2RV8wAY.mjs";
import "./compiler_D5Hgm0ZG.mjs";
import { t as $$Layout } from "./Layout_DYwVF9yM.mjs";
//#region src/pages/blogroll.astro
var blogroll_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Blogroll,
	file: () => $$file,
	url: () => $$url
});
var $$Blogroll = createComponent(async ($$result, $$props, $$slots) => {
	const blogroll = await getCollection("blogs");
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": "Blogroll",
		"description": "Because the internet was meant to be a library, not a shopping centre, here's a list of all the blogs I follow.",
		"data-astro-cid-caiqmxoy": true
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<section class="col-center" data-astro-cid-caiqmxoy><p data-astro-cid-caiqmxoy>Here's a loosely categorised, irregularly updated collection of the feeds I follow. Because the internet was created to be a library, not a shopping centre. Descriptions are from the feeds themselves, so sorry if they're not very descriptive.</p></section><section class="col-wide" data-astro-cid-caiqmxoy>${blogroll.map((collection) => renderTemplate`<details name="feed-categories"${addAttribute(collection.id, "data-category")} data-astro-cid-caiqmxoy><summary data-astro-cid-caiqmxoy><h2 data-astro-cid-caiqmxoy>${collection.id}</h2></summary><ul class="card-container" data-astro-cid-caiqmxoy>${collection.data.items.map((blog) => renderTemplate`<li data-astro-cid-caiqmxoy><h3 data-astro-cid-caiqmxoy><a${addAttribute(blog.htmlUrl, "href")} target="_blank" rel="noopener noreferrer" data-astro-cid-caiqmxoy>${blog.id}</a></h3>${blog.description != null ? renderTemplate`<p data-astro-cid-caiqmxoy>${blog.description}</p>` : ""}<a${addAttribute(blog.xmlUrl, "href")} target="_blank" rel="noopener noreferrer" data-astro-cid-caiqmxoy>Feed for ${blog.id}</a></li>`)}</ul></details>`)}</section>${renderScript($$result, "/home/alexrkeen/Sync/webdev/alexrkeen/src/pages/blogroll.astro?astro&type=script&index=0&lang.ts")}` })}`;
}, "/home/alexrkeen/Sync/webdev/alexrkeen/src/pages/blogroll.astro", void 0);
var $$file = "/home/alexrkeen/Sync/webdev/alexrkeen/src/pages/blogroll.astro";
var $$url = "/blogroll";
//#endregion
//#region \0virtual:astro:page:src/pages/blogroll@_@astro
var page = () => blogroll_exports;
//#endregion
export { page };
