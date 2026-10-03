import { C as createAstro, a as renderComponent, f as renderTemplate, g as maybeRenderHead, l as renderSlot, w as createComponent } from "./server_ucNOZgWh.mjs";
import "./compiler_D5Hgm0ZG.mjs";
import { t as $$Layout } from "./Layout_DYwVF9yM.mjs";
//#region src/layouts/Article.astro
createAstro("https://astro.build");
var $$Article = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Article;
	const { frontmatter } = Astro.props;
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": frontmatter.title,
		"description": frontmatter.description
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<article class="col-center">${renderSlot($$result, $$slots["default"])}</article><div class="col-center"><a href="/writing">See more of my writing!</a></div>` })}<style>
	/* article {
		margin-block-start: 2rem;
	} */
	article p {
		margin-block: 1.2rem;
	}

	.footnotes {
		font-size: 0.8em;
	}

	.footnotes ol {
		margin-block: 0;
	}

	.footnotes p {
		line-height: 1.2em;
	}

	.footnotes ol li::marker {
		color: var(--accent-color);
	}
</style>`;
}, "/home/alexrkeen/Sync/webdev/alexrkeen/src/layouts/Article.astro", void 0);
//#endregion
export { $$Article as t };
