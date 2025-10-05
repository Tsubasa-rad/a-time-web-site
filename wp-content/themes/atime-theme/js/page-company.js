/**
 * Scripts for the Company page.
 * Initializes Intersection Observer to fade in sections on scroll.
 */
document.addEventListener('DOMContentLoaded', function() {
    const initializeScrollAnimations = () => {
        // The PHP template uses '.company-section' for all animatable sections.
        const sections = document.querySelectorAll('.company-section');
        if (sections.length === 0) return;

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    obs.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1, // Start animation when 10% of the element is visible
            rootMargin: '0px 0px -50px 0px' // Trigger a bit earlier
        });

        sections.forEach(section => {
            observer.observe(section);
        });
    };

    initializeScrollAnimations();
});

