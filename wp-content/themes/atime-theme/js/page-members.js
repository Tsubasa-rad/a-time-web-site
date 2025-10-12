/**
 * Scripts for the members page with modal functionality.
 */
document.addEventListener('DOMContentLoaded', function() {
    const snapContainer = document.querySelector('.members-snap-container');
    const memberSections = Array.from(snapContainer.querySelectorAll('.member-section'));
    const scrollIndicator = document.getElementById('scroll-indicator');

    // Select modal elements
    const openModalBtn = document.getElementById('open-member-modal-btn');
    const modal = document.getElementById('member-select-modal');
    const closeModalBtn = document.getElementById('modal-close-btn');
    const modalLinks = document.querySelectorAll('.modal-member-link');

    if (!snapContainer || memberSections.length === 0) return;

    // --- Modal Handling Functions ---
    const openModal = () => {
        if (!modal) return;
        // Use 'is-visible' class to control visibility via CSS
        modal.classList.add('is-visible');
        document.body.classList.add('modal-open');
    };

    const closeModal = () => {
        if (!modal) return;
        // Remove 'is-visible' class
        modal.classList.remove('is-visible');
        document.body.classList.remove('modal-open');
    };

    // Event listener to open the modal
    if (openModalBtn) {
        openModalBtn.addEventListener('click', openModal);
    }

    // Event listener to close the modal with the close button
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    // Event listener to close modal if clicking on the background overlay
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Handle clicks on member links inside the modal
    modalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
            // Close modal after selection
            closeModal();
        });
    });

    // --- Intersection Observer to detect visible section ---
    const updateUIOnScroll = (visibleSection) => {
        const isFooterVisible = visibleSection.classList.contains('footer-section');
        
        // Hide scroll indicator when footer is visible
        if (scrollIndicator) {
             scrollIndicator.classList.toggle('opacity-0', isFooterVisible);
        }
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add class for fade-in animations
                entry.target.classList.add('is-visible');
                updateUIOnScroll(entry.target);
            }
        });
    }, {
        root: snapContainer,
        threshold: 0.6,
    });

    // Observe all member cards and the footer.
    memberSections.forEach(section => observer.observe(section));
    const footerSection = snapContainer.querySelector('.footer-section');
    if (footerSection) {
        observer.observe(footerSection);
    }

    // Initial fade-in for the desktop scroll indicator.
    if(scrollIndicator) {
        setTimeout(() => {
            scrollIndicator.classList.remove('opacity-0');
        }, 500);
    }
});