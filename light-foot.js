const navBarToggle = document.querySelector('.nav_bar_toggle');
const navbarMenu = document.querySelector('.navbar_menu');

navBarToggle.addEventListener('click', () => {
    // Toggle mobile menu
    navbarMenu.classList.toggle('active');

    // Toggle hamburger to X
    navBarToggle.classList.toggle('active');

    // Update aria-expanded for accessibility
    const expanded = navBarToggle.getAttribute('aria-expanded') === 'true' || false;
    navBarToggle.setAttribute('aria-expanded', !expanded);
});
