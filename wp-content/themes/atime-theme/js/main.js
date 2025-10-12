document.addEventListener('DOMContentLoaded', function() {

    const initNavbarScroll = () => {
        const navbar = document.getElementById('navbar');
        const logoImg = document.getElementById('site-logo-img');
        const body = document.body;
        if (!navbar || !logoImg) {
            return;
        }

        const whiteLogoSrc = logoImg.dataset.whiteSrc;
        const blackLogoSrc = logoImg.dataset.blackSrc;
        if (body.classList.contains('page-template-page-members')) {
            logoImg.src = blackLogoSrc;
            return;
        }
        const handleScroll = () => {
            const isScrolled = window.scrollY > 50;

            navbar.classList.toggle('scrolled', isScrolled);

            if (isScrolled) {
                if (logoImg.src !== blackLogoSrc) {
                    logoImg.src = blackLogoSrc;
                }
            } else {
                if (logoImg.src !== whiteLogoSrc) {
                    logoImg.src = whiteLogoSrc;
                }
            }
        };

        handleScroll();

        window.addEventListener('scroll', handleScroll, { passive: true });
    };

    initNavbarScroll();
});