import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { a as renderComponent, f as renderTemplate, g as maybeRenderHead, w as createComponent } from "./server_ucNOZgWh.mjs";
import { t as getCollection } from "./_astro_content_U2RV8wAY.mjs";
import "./compiler_D5Hgm0ZG.mjs";
import { t as $$Layout } from "./Layout_DYwVF9yM.mjs";
import { t as $$Quote } from "./Quote_as3UGWQH.mjs";
//#region src/pages/shoebox/quotes.astro
var quotes_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Quotes,
	file: () => $$file,
	url: () => $$url
});
var $$Quotes = createComponent(async ($$result, $$props, $$slots) => {
	const quotes = await getCollection("quotes");
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": "Quotes",
		"description": "A selection of inspirational quotes"
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<main class="col-center"><h2>Random quote</h2><div id="primary-quote-display"></div><div class="flex-container" style="view-transition-name: refresh-quote;"><button type="button" id="refresh-quote">New random quote</button></div><section style="view-transition-name: section;"><h2>All quotes</h2><label for="quote-search">Filter quotes</label><input type="text" name="quote-search" id="quote-search"> Count: <span id="quote-count"></span><div id="quotes-list-display">${quotes.map((quote) => renderTemplate`${renderComponent($$result, "Quote", $$Quote, {
		"id": quote.id,
		"source": quote.data.source,
		"url": quote.data.url,
		"category": quote.data.category,
		"author": quote.data.author
	})}`)}</div></section></main>` })}<script>
	const quotesListDisplay = document.querySelector('#quotes-list-display');
	const primaryQuoteDisplay = document.querySelector(
		'#primary-quote-display',
	);
	const refreshQuote = document.querySelector('#refresh-quote');
	const quoteSearch = document.querySelector('#quote-search');
	const quoteCount = document.querySelector('#quote-count');
	const quoteData = [];

	// randomise the order of an array
	function shuffle(array) {
		for (let i = array.length - 1; i > 0; i--) {
			let j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
	}

	// render a list of quotes and update the quote count
	function renderList(array) {
		for (const el of array) {
			quotesListDisplay.appendChild(el);
		}
		quoteCount.textContent = quotesListDisplay.childElementCount;
	}

	// return a filtered list of quotes which match the search term
	function filterQuotes(searchTerm) {
		return quoteData.filter((quote) =>
			quote.textContent.toLowerCase().includes(searchTerm.toLowerCase()),
		);
	}

	// pick a random quote from all quotes
	function randomQuote() {
		const randomNumber = Math.floor(Math.random() * quoteData.length);
		const randomQuote = quoteData[randomNumber].cloneNode(true);
		return randomQuote;
	}

	// on page load:
	// - back up quote list
	// - show quote list in random order
	// - display a random quote
	document.addEventListener('DOMContentLoaded', () => {
		const reshuffle = Array.from(quotesListDisplay.children);
		shuffle(reshuffle);
		quoteData.push(...reshuffle);
		quotesListDisplay.innerHTML = '';
		primaryQuoteDisplay.innerHTML = '';
		renderList(quoteData);
		primaryQuoteDisplay.appendChild(randomQuote());
	});

	// show a filtered list when someone types a search term
	quoteSearch.addEventListener('keyup', (e) => {
		quotesListDisplay.innerHTML = '';
		const filteredList = filterQuotes(e.target.value);
		renderList(filteredList);
	});

	refreshQuote.addEventListener('click', () => {
		primaryQuoteDisplay.innerHTML = '';
		primaryQuoteDisplay.appendChild(randomQuote());
	});
<\/script>`;
}, "/home/alexrkeen/Sync/webdev/alexrkeen/src/pages/shoebox/quotes.astro", void 0);
var $$file = "/home/alexrkeen/Sync/webdev/alexrkeen/src/pages/shoebox/quotes.astro";
var $$url = "/shoebox/quotes";
//#endregion
//#region \0virtual:astro:page:src/pages/shoebox/quotes@_@astro
var page = () => quotes_exports;
//#endregion
export { page };
