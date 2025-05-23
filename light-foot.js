// JavaScript for automatic slideshow
let slideIndex = 0;
const slideDelay = 3000; // Configurable slide delay

function showSlides() {
    let i;
    const slides = document.getElementsByClassName("my_slides");
    const dots = document.getElementsByClassName("dot");

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }

    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";

    setTimeout(showSlides, slideDelay);
}

showSlides(); // Start slideshow
