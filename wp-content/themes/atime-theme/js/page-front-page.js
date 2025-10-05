document.addEventListener('DOMContentLoaded', function() {
    // This ensures all scripts run after the page content has loaded.
    initFrontPageScripts();
});

/**
 * Initializes all scripts specific to the front page.
 */
function initFrontPageScripts() {
    initHeroSlideshow();
    initServiceSlider();
}

/**
 * Handles the fading transition for the hero section background images.
 */
function initHeroSlideshow() {
    const slideshow = document.getElementById('slideshow-container');
    if (!slideshow) return;

    const slides = slideshow.querySelectorAll('.slide');
    if (slides.length <= 1) return;

    let currentSlide = 0;
    setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }, 5000); // Change image every 5 seconds
}

/**
 * Initializes the "Our Services" section as a fade/lift slider on mobile.
 */
function initServiceSlider() {
    // This slider logic is only for mobile devices
    if (window.innerWidth >= 768) {
        return;
    }

    const sliderContainer = document.querySelector('.services-slider-container');
    const slider = document.querySelector('.services-slider');
    const cards = slider.querySelectorAll('.service-card');
    const paginationContainer = document.querySelector('.slider-pagination');
    
    if (!sliderContainer || cards.length <= 1) return;

    let currentIndex = 0;
    let autoSlideInterval;
    const totalCards = cards.length;

    // --- Create pagination dots ---
    paginationContainer.innerHTML = ''; // Clear existing dots
    for (let i = 0; i < totalCards; i++) {
        const dot = document.createElement('div');
        dot.classList.add('pagination-dot');
        paginationContainer.appendChild(dot);
    }
    const dots = paginationContainer.querySelectorAll('.pagination-dot');

    /**
     * Shows a specific card by toggling the 'active' class.
     */
    const showCard = (index) => {
        if (index < 0 || index >= totalCards) return;

        cards.forEach((card, i) => {
            card.classList.toggle('active', i === index);
        });
        
        currentIndex = index;
        updatePagination();
    };

    /**
     * Updates the active state of pagination dots.
     */
    const updatePagination = () => {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    };

    /**
     * Advances to the next card in the sequence.
     */
    const nextCard = () => {
        const nextIndex = (currentIndex + 1) % totalCards;
        showCard(nextIndex);
    };

    /**
     * Starts the automatic sliding interval.
     */
    const startAutoSlide = () => {
        stopAutoSlide();
        autoSlideInterval = setInterval(nextCard, 5000); // Slide every 5 seconds
    };
    
    /**
     * Stops the automatic sliding.
     */
    const stopAutoSlide = () => {
        clearInterval(autoSlideInterval);
    };

    /**
     * Restarts the automatic sliding timer after a user interaction.
     */
    const resetAutoSlide = () => {
        stopAutoSlide();
        startAutoSlide();
    };

    // --- Event Listeners ---
    sliderContainer.addEventListener('click', () => {
        nextCard();
        resetAutoSlide();
    });

    // --- Initialization ---
    showCard(0); // Show the first card initially
    startAutoSlide(); // Start the auto-slide timer
}

/**
 * Scripts for the front page.
 */
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    /**
     * Handles navbar style change on scroll.
     */
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-glass');
        } else {
            navbar.classList.remove('navbar-glass');
        }
    };
    handleScroll(); // Initial check
    window.addEventListener('scroll', handleScroll);

    /**
     * Initializes the hero slideshow.
     */
    const slideshow = document.getElementById('slideshow-container');
    if (slideshow) {
        const slides = slideshow.querySelectorAll('.slide');
        if (slides.length > 1) {
            let currentSlide = 0;
            setInterval(() => {
                slides[currentSlide].classList.remove('active');
                currentSlide = (currentSlide + 1) % slides.length;
                slides[currentSlide].classList.add('active');
            }, 5000);
        }
    }

    /**
     * Initializes fade-in animations on scroll.
     */
    const faders = document.querySelectorAll('.fade-in');
    if (faders.length > 0) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        faders.forEach(fader => observer.observe(fader));
    }
});
