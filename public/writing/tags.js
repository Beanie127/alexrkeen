const tags = ["improv", "tech", "marketing"];
const buttons = document.querySelectorAll("[data-target]");
const essays = document.querySelectorAll("#essays li");

buttons.forEach((button) => {
  const tag = button.dataset.target;
  button.addEventListener("click", () => {
    if (tag == "all") {
      if (!document.startViewTransition) {
        essays.forEach((essay) => essay.removeAttribute("hidden"));
      } else {
        document.startViewTransition(() => {
          essays.forEach((essay) => essay.removeAttribute("hidden"));
        });
      }
    } else {
      if (!document.startViewTransition) {
        essays.forEach((essay) => {
          hideEssay(essay, tag);
        });
      } else {
        document.startViewTransition(() => {
          essays.forEach((essay) => {
            hideEssay(essay, tag);
          });
        });
      }
    }
  });
});

const hideEssay = (essay, tag) => {
  if (essay.classList.contains(tag)) {
    essay.removeAttribute("hidden");
  } else {
    essay.setAttribute("hidden", "hidden");
  }
};

document
  .querySelector("button[data-target='all']")
  .addEventListener("click", () => {});
