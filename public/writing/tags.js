const tags = ["improv", "tech", "marketing"];
const essays = document.querySelectorAll("li.filterable");

tags.forEach((tag) => {
  console.log(tag);
  const button = document.querySelector(`button.filter.${tag}`);
  console.log(button);
  button.addEventListener("click", (e) => {
    e.preventDefault;
    resetFilter();
    essays.forEach((essay) => {
      if (!essay.classList.contains(tag)) {
        essay.classList.add("is-hidden");
      }
    });
    button.classList.add("is-active");
  });
});

const resetFilter = () => {
  essays.forEach((essay) => essay.classList.remove("is-hidden"));
  document
    .querySelectorAll("button.filter")
    .forEach((button) => button.classList.remove("is-active"));
};

document
  .querySelector("button.filter.all")
  .addEventListener("click", resetFilter);
