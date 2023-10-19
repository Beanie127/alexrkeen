const tags = ["improv", "tech", "marketing"];

tags.forEach((tag) => {
	const button = document.querySelector(`button.filter.${tag}`);
	const targets = document.querySelectorAll(`li.filterable.${tag}`);
	button.addEventListener("click", (e) => {
		e.preventDefault;
		resetFilter();
		targets.forEach((target) => target.classList.remove("is-hidden"));
		button.classList.add("is-active");
	});
});

const resetFilter = () => {
	document
		.querySelectorAll("li.filterable")
		.forEach((li) => li.classList.add("is-hidden"));
	document
		.querySelectorAll("button.filter")
		.forEach((button) => button.classList.remove("is-active"));
};

document.querySelector("button.filter.all").addEventListener("click", (e) => {
	e.preventDefault;
	document
		.querySelectorAll("li.filterable")
		.forEach((li) => li.classList.remove("is-hidden"));
	document
		.querySelectorAll("button.filter")
		.forEach((button) => button.classList.remove("is-active"));
});
