// JavaScript for automatic slideshow
let slideIndex = 0; //start at zero
showSlides();

function showSlides() {
    let i;
    let slides = document.getElementsByClassName("my_slides");
    let dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
    setTimeout(showSlides, 3000); // Change image every 3 seconds
}

//JavaScript for Contact Form
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    const form = event.target;
    const formData = new FormData(form);
    const formMessage = document.getElementById('form-message');

    formMessage.textContent = 'Sending...'; // Indicate that the form is being sent

    fetch('/submit-form', { // Replace '/submit-form' with your server endpoint
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
            formMessage.textContent = 'Email sent successfully!';
            formMessage.style.color = 'green'; // Change message color to green for success
            form.reset(); // Reset form after success
        } else {
            formMessage.textContent = data.message || 'Email sending failed. Please try again.';
            formMessage.style.color = 'red'; // Change message color to red for failure
        }
    })
    .catch(error => {
        console.error('Error:', error);
        formMessage.textContent = 'An error occurred. Please try again.';
        formMessage.style.color = 'red'; // Change message color to red for errors
    });
});

//JavaScript for mobile menu
const mobileMenu = document.getElementById('mobile_menu');
const navMenu = document.querySelector('.navbar_menu');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});