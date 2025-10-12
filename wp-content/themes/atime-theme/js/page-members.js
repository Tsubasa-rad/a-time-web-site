
document.addEventListener('DOMContentLoaded', function() {
    const snapContainer = document.querySelector('.members-snap-container');
    const memberSections = Array.from(snapContainer.querySelectorAll('.member-section'));
    const scrollIndicator = document.getElementById('scroll-indicator');

    const openModalBtn = document.getElementById('open-member-modal-btn');
    const modal = document.getElementById('member-select-modal');
    const closeModalBtn = document.getElementById('modal-close-btn');
    const modalLinks = document.querySelectorAll('.modal-member-link');

    if (!snapContainer || memberSections.length === 0) return;

    const openModal = () => {
        if (!modal) return;
        modal.classList.add('is-visible');
        document.body.classList.add('modal-open');
    };

    const closeModal = () => {
        if (!modal) return;
        modal.classList.remove('is-visible');
        document.body.classList.remove('modal-open');
    };

    if (openModalBtn) {
        openModalBtn.addEventListener('click', openModal);
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    modalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
            closeModal();
        });
    });

    const updateUIOnScroll = (visibleSection) => {
        const isFooterVisible = visibleSection.classList.contains('footer-section');
        
        if (scrollIndicator) {
             scrollIndicator.classList.toggle('opacity-0', isFooterVisible);
        }
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                updateUIOnScroll(entry.target);
            }
        });
    }, {
        root: snapContainer,
        threshold: 0.6,
    });

    memberSections.forEach(section => observer.observe(section));
    const footerSection = snapContainer.querySelector('.footer-section');
    if (footerSection) {
        observer.observe(footerSection);
    }

    if(scrollIndicator) {
        setTimeout(() => {
            scrollIndicator.classList.remove('opacity-0');
        }, 500);
    }
});