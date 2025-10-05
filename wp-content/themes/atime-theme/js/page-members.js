/**
 * Scripts for the members page.
 */
document.addEventListener('DOMContentLoaded', function() {
    const snapContainer = document.querySelector('.members-snap-container');
    const memberSections = Array.from(snapContainer.querySelectorAll('.member-section'));
    const footerSection = snapContainer.querySelector('.footer-section');
    const scrollBtn = document.getElementById('scroll-down-btn');
    const scrollBtnIcon = document.getElementById('scroll-btn-icon');
    const scrollIndicator = document.getElementById('scroll-indicator');
    const tabButtons = document.querySelectorAll('.member-tab-btn');

    if (!snapContainer || memberSections.length === 0) return;

    let currentMemberIndex = 0;

    // --- Tab Button Click Handling ---
    tabButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // --- Scroll Down Button Click Handling ---
    if (scrollBtn) {
        scrollBtn.addEventListener('click', () => {
            const nextMemberIndex = (currentMemberIndex + 1) % memberSections.length;
            memberSections[nextMemberIndex].scrollIntoView({ behavior: 'smooth' });
        });
    }

    // --- Update UI based on visible section ---
    const updateButtonState = (visibleSection) => {
        const memberIndex = memberSections.indexOf(visibleSection);

        // Update active state for tab buttons
        tabButtons.forEach(btn => {
            // Inactive state styles
            btn.classList.remove('is-active', 'bg-primary', 'text-white');
            btn.classList.add('bg-white', 'text-gray-700', 'hover:bg-gray-100');
        });
        const activeTab = document.querySelector(`.member-tab-btn[data-target="#${visibleSection.id}"]`);
        if (activeTab) {
            // Active state styles
            activeTab.classList.add('is-active', 'bg-primary', 'text-white');
            activeTab.classList.remove('bg-white', 'text-gray-700', 'hover:bg-gray-100');
        }

        // Update scroll down button
        if (scrollBtn) {
            if (memberIndex !== -1) { // It's a member card.
                currentMemberIndex = memberIndex;
                scrollBtn.classList.remove('opacity-0', 'pointer-events-none');
                if (scrollIndicator) scrollIndicator.classList.remove('opacity-0');

                // Change icon to 'up' on the last member.
                if (currentMemberIndex === memberSections.length - 1) {
                    scrollBtnIcon.classList.replace('fa-chevron-down', 'fa-chevron-up');
                } else {
                    scrollBtnIcon.classList.replace('fa-chevron-up', 'fa-chevron-down');
                }
            } else if (visibleSection === footerSection) { // It's the footer.
                scrollBtn.classList.add('opacity-0', 'pointer-events-none');
                if (scrollIndicator) scrollIndicator.classList.add('opacity-0');
            }
        }
    };

    // --- Intersection Observer to detect visible section ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                updateButtonState(entry.target);
            }
        });
    }, {
        root: snapContainer,
        threshold: 0.6,
    });

    // Observe all member cards and the footer.
    memberSections.forEach(section => observer.observe(section));
    if (footerSection) {
        observer.observe(footerSection);
    }

    // Initial fade-in for the scroll button.
    if(scrollBtn) {
        setTimeout(() => {
            scrollBtn.classList.remove('opacity-0', 'pointer-events-none');
            if (scrollIndicator) {
                scrollIndicator.classList.remove('opacity-0');
            }
        }, 500);
    }
});

