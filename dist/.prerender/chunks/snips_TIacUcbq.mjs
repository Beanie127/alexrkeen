import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { C as createAstro, a as renderComponent, f as renderTemplate, g as maybeRenderHead, o as Fragment, w as createComponent, x as unescapeHTML } from "./server_ucNOZgWh.mjs";
import "./compiler_D5Hgm0ZG.mjs";
import { t as $$Layout } from "./Layout_DYwVF9yM.mjs";
import { createCssVariablesTheme, createHighlighter, isSpecialLang } from "shiki";
import { createOnigurumaEngine } from "shiki/engine/oniguruma";
import { bundledLanguages } from "shiki/langs";
//#region node_modules/@astrojs/internal-helpers/dist/shiki-engine-default.js
function loadShikiEngine() {
	return createOnigurumaEngine(import("shiki/wasm"));
}
//#endregion
//#region node_modules/@astrojs/internal-helpers/dist/shiki.js
var _cssVariablesTheme;
var cssVariablesTheme = () => _cssVariablesTheme ?? (_cssVariablesTheme = createCssVariablesTheme({ variablePrefix: "--astro-code-" }));
var cachedHighlighters = /* @__PURE__ */ new Map();
function createShikiHighlighter(options) {
	const key = getCacheKey(options);
	let highlighterPromise = cachedHighlighters.get(key);
	if (!highlighterPromise) {
		highlighterPromise = createShikiHighlighterInternal(options);
		cachedHighlighters.set(key, highlighterPromise);
	}
	return ensureLanguagesLoaded(highlighterPromise, options?.langs);
}
function getCacheKey(options) {
	const keyCache = [];
	const { theme, themes, langAlias } = options ?? {};
	if (theme) keyCache.push(theme);
	if (themes) keyCache.push(Object.entries(themes).sort());
	if (langAlias) keyCache.push(Object.entries(langAlias).sort());
	return keyCache.length > 0 ? JSON.stringify(keyCache) : "";
}
async function ensureLanguagesLoaded(promise, langs) {
	const highlighter = await promise;
	if (!langs) return highlighter;
	const loadedLanguages = highlighter.getLoadedLanguages();
	for (const lang of langs) {
		if (typeof lang === "string" && (isSpecialLang(lang) || loadedLanguages.includes(lang))) continue;
		await highlighter.loadLanguage(lang);
	}
	return highlighter;
}
var shikiEngine = void 0;
async function createShikiHighlighterInternal({ langs = [], theme = "github-dark", themes = {}, langAlias = {} } = {}) {
	theme = theme === "css-variables" ? cssVariablesTheme() : theme;
	if (shikiEngine === void 0) shikiEngine = await loadShikiEngine();
	const highlighter = await createHighlighter({
		langs: ["plaintext", ...langs],
		langAlias,
		themes: Object.values(themes).length ? Object.values(themes) : [theme],
		engine: shikiEngine
	});
	async function highlight(code, lang = "plaintext", options, to) {
		const resolvedLang = langAlias[lang] ?? lang;
		const loadedLanguages = highlighter.getLoadedLanguages();
		if (!isSpecialLang(lang) && !loadedLanguages.includes(resolvedLang)) try {
			await highlighter.loadLanguage(resolvedLang);
		} catch (_err) {
			const langStr = lang === resolvedLang ? `"${lang}"` : `"${lang}" (aliased to "${resolvedLang}")`;
			console.warn(`[Shiki] The language ${langStr} doesn't exist, falling back to "plaintext".`);
			lang = "plaintext";
		}
		code = code.replace(/(?:\r\n|\r|\n)$/, "");
		const themeOptions = Object.values(themes).length ? { themes } : { theme };
		const inline = options?.inline ?? false;
		return highlighter[to === "html" ? "codeToHtml" : "codeToHast"](code, {
			...themeOptions,
			defaultColor: options.defaultColor,
			lang,
			meta: options?.meta ? { __raw: options?.meta } : void 0,
			transformers: [{
				pre(node) {
					if (inline) node.tagName = "code";
					const { class: attributesClass, style: attributesStyle, ...rest } = options?.attributes ?? {};
					Object.assign(node.properties, rest);
					const classValue = (normalizePropAsString(node.properties.class) ?? "") + (attributesClass ? ` ${attributesClass}` : "");
					const styleValue = (normalizePropAsString(node.properties.style) ?? "") + (attributesStyle ? `; ${attributesStyle}` : "");
					node.properties.class = classValue.replace(/shiki/g, "astro-code");
					node.properties.dataLanguage = lang;
					if (options.wrap === false || options.wrap === void 0) node.properties.style = styleValue + "; overflow-x: auto;";
					else if (options.wrap === true) node.properties.style = styleValue + "; overflow-x: auto; white-space: pre-wrap; word-wrap: break-word;";
				},
				line(node) {
					if (resolvedLang === "diff") {
						const innerSpanNode = node.children[0];
						const innerSpanTextNode = innerSpanNode?.type === "element" && innerSpanNode.children?.[0];
						if (innerSpanTextNode && innerSpanTextNode.type === "text") {
							const start = innerSpanTextNode.value[0];
							if (start === "+" || start === "-") {
								innerSpanTextNode.value = innerSpanTextNode.value.slice(1);
								innerSpanNode.children.unshift({
									type: "element",
									tagName: "span",
									properties: { style: "user-select: none;" },
									children: [{
										type: "text",
										value: start
									}]
								});
							}
						}
					}
				},
				code(node) {
					if (inline) return node.children[0];
				}
			}, ...options.transformers ?? []]
		});
	}
	return {
		codeToHast(code, lang, options = {}) {
			return highlight(code, lang, options, "hast");
		},
		codeToHtml(code, lang, options = {}) {
			return highlight(code, lang, options, "html");
		},
		loadLanguage(...newLangs) {
			return highlighter.loadLanguage(...newLangs);
		},
		getLoadedLanguages() {
			return highlighter.getLoadedLanguages();
		}
	};
}
function normalizePropAsString(value) {
	return Array.isArray(value) ? value.join(" ") : value;
}
//#endregion
//#region node_modules/astro/components/Code.astro
createAstro("https://astro.build");
var $$Code = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Code;
	const { code, lang = "plaintext", embeddedLangs = [], meta, theme = "github-dark", themes = {}, defaultColor = "light", wrap = false, inline = false, transformers = [], ...rest } = Astro.props;
	if (typeof lang === "object") {
		if (lang.id) lang.name = lang.id;
		if (lang.grammar) Object.assign(lang, lang.grammar);
	}
	const html = await (await createShikiHighlighter({
		langs: [typeof lang === "string" ? Object.keys(bundledLanguages).includes(lang) ? lang : "plaintext" : lang, ...embeddedLangs],
		theme,
		themes
	})).codeToHtml(code, typeof lang === "string" ? lang : lang.name, {
		defaultColor,
		wrap,
		inline,
		transformers,
		meta,
		attributes: rest
	});
	return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": async ($$result) => renderTemplate`${unescapeHTML(html)}` })}`;
}, "/home/alexrkeen/Sync/webdev/alexrkeen/node_modules/astro/components/Code.astro", void 0);
//#endregion
//#region node_modules/astro/components/Debug.astro
createAstro("https://astro.build");
var $$Debug = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Debug;
	const key = Object.keys(Astro.props)[0];
	const value = Astro.props[key];
	return renderTemplate`${maybeRenderHead($$result)}<div class="astro-debug"><div class="astro-debug-header"><h2 class="astro-debug-title"><span class="astro-debug-label">Debug</span><span class="astro-debug-name">"${key}"</span></h2></div>${renderComponent($$result, "Code", $$Code, { "code": JSON.stringify(value, null, 2) })}</div><style>
	.astro-debug {
		font-size: 14px;
		padding: 1rem 1.5rem;
		background: white;
		font-family:
			-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
			'Helvetica Neue', sans-serif;
	}

	.astro-debug-header,
	pre.astro-code {
		margin: -1rem -1.5rem 1rem;
		padding: 0.25rem 0.75rem;
	}

	.astro-debug-header {
		background: #ff1639;
		border-radius: 4px;
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
	}

	.astro-debug-title {
		font-size: 1em;
		color: white;
		margin: 0.5em 0;
	}

	.astro-debug-label {
		font-weight: bold;
		text-transform: uppercase;
		margin-right: 0.75em;
	}

	pre.astro-code {
		border: 1px solid #eee;
		padding: 1rem 0.75rem;
		border-radius: 4px;
		border-top-left-radius: 0;
		border-top-right-radius: 0;
		font-size: 14px;
	}
</style>`;
}, "/home/alexrkeen/Sync/webdev/alexrkeen/node_modules/astro/components/Debug.astro", void 0);
//#endregion
//#region src/pages/shoebox/snips.astro
var snips_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Snips,
	file: () => $$file,
	url: () => $$url
});
var $$Snips = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": "Code Snippets",
		"description": "A selection of useful code snippets",
		"data-astro-cid-6v2wxhjo": true
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<p class="col-center" data-astro-cid-6v2wxhjo>A selection of helpful code snippets.</p><ul class="col-full-bleed card-container" data-astro-cid-6v2wxhjo><li data-astro-cid-6v2wxhjo>${renderComponent($$result, "Code", $$Code, {
		"code": "// querySelector Alias\r\nconst $ = function (target, origin = document) {\r\n    return origin.querySelector(target)\r\n}\r\nconst $$ = function (target, origin = document) {\r\n    return Array.from(origin.querySelectorAll(target)\r\n}",
		"lang": "js",
		"data-astro-cid-6v2wxhjo": true
	})}</li><li data-astro-cid-6v2wxhjo>${renderComponent($$result, "Code", $$Code, {
		"code": "//randomise the order of an array\r\nfunction shuffle(array) {\r\n    for (let i = array.length - 1; i > 0; i--) {\r\n        let j = Math.floor(Math.random() * (i + 1));\r\n        [array[i], array[j]] = [array[j], array[i]];\r\n    }\r\n}}",
		"lang": "js",
		"data-astro-cid-6v2wxhjo": true
	})}</li><li data-astro-cid-6v2wxhjo>${renderComponent($$result, "Code", $$Code, {
		"code": "// Random pick functions\r\nfunction randomIntTween(min, max, inclusive = false) {\r\n    let range;\r\n    if (inclusive) {\r\n        range = max - min + 1;\r\n    } else {\r\n        range = max - min;\r\n    }\r\nconst result = min + Math.floor(Math.random() * range);\r\nreturn result;\r\n}\r\n\r\nfunction bellCurveTween(min, max) {\r\n    return Math.floor(\r\n        (randomIntTween(min, max) + randomIntTween(min, max)) / 2,\r\n    );\r\n}\r\n\r\nfunction pickFrom(array, bellCurve = false) {\r\n    let index;\r\n    if (bellCurve) {\r\n        index = bellCurveTween(0, array.length);\r\n    } else {\r\n        index = randomIntTween(0, array.length);\r\n    }\r\n    return array[index];\r\n}",
		"lang": "js",
		"data-astro-cid-6v2wxhjo": true
	})}</li></ul>` })}`;
}, "/home/alexrkeen/Sync/webdev/alexrkeen/src/pages/shoebox/snips.astro", void 0);
var $$file = "/home/alexrkeen/Sync/webdev/alexrkeen/src/pages/shoebox/snips.astro";
var $$url = "/shoebox/snips";
//#endregion
//#region \0virtual:astro:page:src/pages/shoebox/snips@_@astro
var page = () => snips_exports;
//#endregion
export { page };
