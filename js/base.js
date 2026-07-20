// =========================================================
// BASE.JS
// Shared on EVERY page: hamburger menu, active nav link,
// smooth scroll to homepage sections, navbar scroll effect.
// Load this on every page (before any page-specific JS).
// =========================================================
document.addEventListener('DOMContentLoaded', () => {

    const navbar = document.querySelector('nav');
    const aboutSection = document.getElementById('about-section');
    const navLinks = document.querySelectorAll('.nav-links a');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');

    // ==============================
    // ===== HAMBURGER MENU =====
    // ==============================
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('show');
            hamburger.classList.toggle('active');
        });

        // Close menu whenever a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('show');
                hamburger.classList.remove('active');
            });
        });
    }

    // ==============================
    // ===== SMOOTH SCROLL =====
    // For links like "index.html#about-section" clicked
    // while already sitting on index.html.
    // ==============================
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || !href.includes('#')) return;

            const [page, hash] = href.split('#');
            const target = document.getElementById(hash);

            const onHomePage =
                window.location.pathname.endsWith('index.html') ||
                window.location.pathname === '/' ||
                window.location.pathname === '';

            if (target && onHomePage && (page === '' || page === 'index.html')) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ==============================
    // ===== ACTIVE NAV LINK =====
    // Highlights whichever nav link matches the current page
    // (and, on the homepage, the current hash). Fully dynamic —
    // no need to hand-edit class="current" in any HTML file.
    // ==============================
    const setActiveLink = () => {
        let currentPath = window.location.pathname.split('/').pop();
        if (currentPath === '') currentPath = 'index.html';
        const currentHash = window.location.hash;

        navLinks.forEach(link => {
            link.classList.remove('current');
            const href = link.getAttribute('href');
            if (!href) return;

            const [rawPage, hash] = href.split('#');
            const linkPage = rawPage === '' ? 'index.html' : rawPage;

            if (hash) {
                const isDefaultHome = hash === 'home-section' && currentHash === '';
                if (linkPage === currentPath && (currentHash === `#${hash}` || isDefaultHome)) {
                    link.classList.add('current');
                }
            } else if (linkPage === currentPath) {
                link.classList.add('current');
            }
        });
    };

    setActiveLink();
    window.addEventListener('hashchange', setActiveLink);

    // ==============================
    // ===== NAVBAR SCROLL EFFECT =====
    // Only relevant on index.html (has #about-section).
    // Turns the transparent hero-navbar into a solid, readable
    // one once the user scrolls to the About section, AND keeps
    // the Home/About nav links in sync with scroll position.
    // Runs AFTER setActiveLink() above so it wins on load if the
    // page happens to open already scrolled down.
    // ==============================
    if (navbar && aboutSection) {
        const navHeight = navbar.offsetHeight;
        const homeLink = document.querySelector('.nav-links a[href="index.html#home-section"]');
        const aboutLink = document.querySelector('.nav-links a[href="index.html#about-section"]');

        const updateNavOnScroll = () => {

        // Blur starts early while still over the hero image
        const blurTriggerPoint = aboutSection.offsetTop - navHeight - 500;

        // Text colour changes closer to the About section
        const colourTriggerPoint = aboutSection.offsetTop - navHeight + 50;


    // ===== NAVBAR BLUR =====
        if (window.scrollY > blurTriggerPoint) {
            navbar.classList.add('nav-blur');
        } else {
            navbar.classList.remove('nav-blur');
        }


    // ===== NAVBAR TEXT COLOUR + ACTIVE LINK =====
        if (window.scrollY > colourTriggerPoint) {
            navbar.classList.add('nav-scrolled');
        if (aboutLink) aboutLink.classList.add('current');
        if (homeLink) homeLink.classList.remove('current');

        } else {
            navbar.classList.remove('nav-scrolled');
        if (homeLink) homeLink.classList.add('current');
        if (aboutLink) aboutLink.classList.remove('current');

        }
    };

        window.addEventListener('scroll', updateNavOnScroll);
        updateNavOnScroll(); // run once in case page loads mid-scroll
    }

});