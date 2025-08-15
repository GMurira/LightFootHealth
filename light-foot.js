const navBarToggle = document.querySelector('.nav_bar_toggle');
const navbarMenu = document.querySelector('.navbar_menu');

navBarToggle.addEventListener('click', () => {
    const expanded = navBarToggle.getAttribute('aria-expanded') === 'true' || false;
    navBarToggle.setAttribute('aria-expanded', !expanded);
    navbarMenu.classList.toggle('active');
});
