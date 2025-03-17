const sliderWrapper = document.querySelector('.slider-wrapper'); 
const images = document.querySelectorAll('.slider-wrapper img');
const totalImages = images.length;

let currentIndex = 0;

function moveSlider() {
    currentIndex = (currentIndex + 1) % totalImages;
    sliderWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
}

setInterval(moveSlider, 3000);