
const slidesContainer = document.querySelector('.slideshow-container');
let currentSlide = 0;
let images = [];

function loadImages() {
    images = [
        'images/photo_2024-06-19.jpg',
        'images/photo_2024-09-23.jpg',
        'images/photo_2024-09-25.jpg',
        'images/photo_2024-09-02.jpg',
        'images/photo_2024-09-19.jpg',
        'images/photo_2024-09-09.jpg',
    ];

    images.forEach((image, index) => {
        const slideDiv = document.createElement('div');
        slideDiv.classList.add('slide');
        slideDiv.style.backgroundImage = `url(${image})`;

        const date = extractDateFromFilename(image);
        const dateLabel = document.createElement('div');
        dateLabel.classList.add('date-label');
        dateLabel.textContent = date;

        slideDiv.appendChild(dateLabel);

        if (index === 0) {
            gsap.set(slideDiv, { opacity: 1 });
        }

        slidesContainer.appendChild(slideDiv);
    });
}

function extractDateFromFilename(filename) {
    const regex = /photo_(\d{4}-\d{2}-\d{2})/;
    const match = filename.match(regex);
    return match ? match[1] : 'Unknown date';
}

function showSlide(nextSlide, direction = 1) {
    const slides = document.querySelectorAll('.slide');
    const current = slides[currentSlide];
    const next = slides[nextSlide];

    gsap.to(current, {
        x: direction * -100 + '%',
        opacity: 0,
        duration: 1.5,
        ease: "power2.inOut",
        onComplete: () => {
            currentSlide = nextSlide;
        }
    });

    gsap.set(next, { x: direction * 100 + '%' });

    gsap.to(next, {
        x: 0,
        opacity: 1,
        scale: 1.1,
        rotation: 0.02 * direction * 10,
        duration: 1.5,
        ease: "power2.out"
    });
}

function nextSlide() {
    const nextSlideIndex = (currentSlide + 1) % images.length;
    showSlide(nextSlideIndex, 1);
}

function prevSlide() {
    const prevSlideIndex = (currentSlide - 1 + images.length) % images.length;
    showSlide(prevSlideIndex, -1);
}

setInterval(nextSlide, 5000); 

loadImages();

document.getElementById('next').addEventListener('click', nextSlide);
document.getElementById('prev').addEventListener('click', prevSlide);
