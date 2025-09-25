
// Navbar Hamburger Toggle
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.querySelector(".nav_bar_toggle");
  const navMenu = document.querySelector(".navbar_menu");

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener("click", () => {
      navMenu.classList.toggle("active");

      // update aria-expanded for accessibility
      const expanded = toggleBtn.getAttribute("aria-expanded") === "true";
      toggleBtn.setAttribute("aria-expanded", !expanded);
    });
  }
});
