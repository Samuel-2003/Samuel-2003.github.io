let currentIndex = 0;
const slides = document.querySelectorAll('.carousel-item');
const intervalTime = 4000;

function showSlide(index) {
    if (index >= slides.length) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = slides.length - 1;
    } else {
        currentIndex = index;
    }

    slides.forEach((slide, idx) => {
        if (idx === currentIndex) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });
}

function nextSlide() {
    showSlide(currentIndex + 1);
}

function prevSlide() {
    showSlide(currentIndex - 1);
}

function toggleMode() {
    document.body.classList.toggle('dark-mode');
}

function toggleNav() {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('active');
}

function toggleDropdown() {
    const dropdownMenu = document.querySelector('.dropdown-menu');
    dropdownMenu.classList.toggle('active');
}

document.addEventListener('DOMContentLoaded', () => {
    showSlide(currentIndex);
    setInterval(nextSlide, intervalTime);
});
