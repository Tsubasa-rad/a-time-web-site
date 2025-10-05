/**
 * Global scripts for the a-time theme.
 */
document.addEventListener('DOMContentLoaded', function() {

    /**
     * Initializes all global scripts.
     */
    const initializeGlobalScripts = () => {
        initializeNavbar();
        initializeMobileMenu();
        initializeSmoothScrolling();
    };

    /**
     * Sets the initial state of the navbar.
     * Solid for all pages except the homepage.
     */
    function initializeNavbar() {
        const navbar = document.getElementById('navbar');
        if (navbar && !document.body.classList.contains('home')) {
            navbar.classList.add('navbar-solid');
        }
    }

    /**
     * Toggles the mobile menu.
     */
    function initializeMobileMenu() {
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
        }
    }

    /**
     * Enables smooth scrolling for on-page anchor links.
     */
    function initializeSmoothScrolling() {
        document.querySelectorAll('a[href*="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                const url = new URL(href, window.location.href);

                if (url.pathname === window.location.pathname && url.hash) {
                    const targetElement = document.querySelector(url.hash);
                    if (targetElement) {
                        e.preventDefault();
                        targetElement.scrollIntoView({ behavior: 'smooth' });
                        const mobileMenu = document.getElementById('mobile-menu');
                        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                            mobileMenu.classList.add('hidden');
                        }
                    }
                }
            });
        });
    }

    initializeGlobalScripts();
});
