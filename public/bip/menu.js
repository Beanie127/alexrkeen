const toggleNav = document.querySelector("#toggle-nav");
const sidebar = document.querySelector("#sidebar");

toggleNav.addEventListener("click", (e) => {
  e.preventDefault;
  sidebar.toggleAttribute("data-visible");
});
