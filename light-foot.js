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

// JavaScript for Contact Form
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    const form = event.target;
    const formData = new FormData(form);
    const formMessage = document.getElementById('form-message');

    formMessage.textContent = 'Sending...';
    formMessage.style.color = 'blue'; // Indicate sending with blue

    fetch('send_email.php', { // Ensure this matches your PHP file's name
        method: 'POST',
        body: formData,
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            formMessage.textContent = data.message || 'Email sent successfully!';
            formMessage.style.color = 'green';
            form.reset();
        } else {
            formMessage.textContent = data.message || 'Email sending failed. Please try again.';
            formMessage.style.color = 'red';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        formMessage.textContent = 'An error occurred. Please try again.';
        formMessage.style.color = 'red';
    });
});

// JavaScript for mobile menu and dropdown
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.getElementById('mobile_menu');
    const navMenu = document.querySelector('.navbar_menu');
    const dropdownLink = document.querySelector('.navbar_item.dropdown > .navbar_link'); // Select the link
    const dropdownContent = document.querySelector('.dropdown-content'); // Select the dropdown content

    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
            const isExpanded = navMenu.classList.contains('active');
            navMenu.setAttribute('aria-expanded', isExpanded);
        });

        navMenu.setAttribute('aria-expanded', 'false');

        if (dropdownLink && dropdownContent) {
            dropdownLink.addEventListener('click', function(event) {
                event.preventDefault();
                dropdownContent.classList.toggle('show');
            });

            window.addEventListener('click', function(event) {
                if (!dropdownLink.contains(event.target) && !dropdownContent.contains(event.target)) {
                    dropdownContent.classList.remove('show');
                }
            });
        }
    }
});