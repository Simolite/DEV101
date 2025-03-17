const sliderWrapper = document.querySelector('.slider-wrapper'); 
const images = document.querySelectorAll('.slider-wrapper img');
const totalImages = images.length;

let currentIndex = 0;

function moveSlider() {
    currentIndex = (currentIndex + 1) % totalImages; // Loop back to start
    sliderWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Move to the next image every 3 seconds
setInterval(moveSlider, 3000);