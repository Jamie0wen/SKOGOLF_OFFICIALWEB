// ===== Main JS for Multi-Page Site =====
document.addEventListener('DOMContentLoaded', () => {

    // ==============================
    // ===== GALLERY LIGHTBOX =====
    // ==============================
    const mediaSection = document.getElementById('media');

    if (mediaSection) {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = lightbox?.querySelector('img');
        const closeBtn = lightbox?.querySelector('.close');
        const images = Array.from(mediaSection.querySelectorAll('.media-grid img'));

        if (lightbox && lightboxImg && closeBtn && images.length) {

            let prevBtn = lightbox.querySelector('.nav-arrow.prev');
            let nextBtn = lightbox.querySelector('.nav-arrow.next');

            // Create arrows if missing
            if (!prevBtn || !nextBtn) {
                prevBtn = document.createElement('span');
                nextBtn = document.createElement('span');

                prevBtn.className = 'nav-arrow prev';
                nextBtn.className = 'nav-arrow next';

                prevBtn.innerHTML = '&#10094;';
                nextBtn.innerHTML = '&#10095;';

                lightbox.appendChild(prevBtn);
                lightbox.appendChild(nextBtn);
            }

            let currentIndex = 0;

            const showLightbox = (index) => {
                currentIndex = index;
                lightboxImg.src = images[index].src;
                lightboxImg.alt = images[index].alt;
                lightbox.style.display = 'flex';
            };

            images.forEach((img, index) => {
                img.addEventListener('click', () => showLightbox(index));
            });

            const closeLightbox = () => {
                lightbox.style.display = 'none';
            };

            closeBtn.addEventListener('click', closeLightbox);

            lightbox.addEventListener('click', e => {
                if (e.target === lightbox) closeLightbox();
            });

            prevBtn.addEventListener('click', e => {
                e.stopPropagation();
                currentIndex = (currentIndex - 1 + images.length) % images.length;
                showLightbox(currentIndex);
            });

            nextBtn.addEventListener('click', e => {
                e.stopPropagation();
                currentIndex = (currentIndex + 1) % images.length;
                showLightbox(currentIndex);
            });

            // Drag-to-scroll
            const slider = mediaSection.querySelector('.media-grid');
            if (slider) {
                let isDown = false, startX, scrollLeft;

                slider.addEventListener('mousedown', e => {
                    isDown = true;
                    startX = e.pageX - slider.offsetLeft;
                    scrollLeft = slider.scrollLeft;
                });

                ['mouseleave', 'mouseup'].forEach(event =>
                    slider.addEventListener(event, () => isDown = false)
                );

                slider.addEventListener('mousemove', e => {
                    if (!isDown) return;
                    e.preventDefault();
                    const x = e.pageX - slider.offsetLeft;
                    const walk = (x - startX) * 2;
                    slider.scrollLeft = scrollLeft - walk;
                });
            }
        }
    }

    // ==============================
    // ===== SMOOTH SCROLL (HOME) =====
    // ==============================
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            if (!href.includes('#')) return;

            const [page, hash] = href.split('#');
            const target = document.getElementById(hash);

            const onHomePage = window.location.pathname.includes('index.html') || window.location.pathname === '/';

            if (target && onHomePage) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    

    // ==============================
    // ===== NAVBAR SCROLL COLOR =====
    // ==============================
    const navbar = document.querySelector('nav');
    const aboutSection = document.getElementById('about-section');

    if (navbar && aboutSection) {
        window.addEventListener('scroll', () => {
            const trigger = window.scrollY + navbar.offsetHeight;

            navbar.classList.toggle(
                'navbar-about',
                trigger >= aboutSection.offsetTop
            );
        });
    }

    // ==============================
    // ===== ACTIVE NAV LINK =====
    // ==============================
    const setActiveLink = () => {
        const currentPath = window.location.pathname.split('/').pop();
        const currentHash = window.location.hash;

        navLinks.forEach(link => {
            link.classList.remove('current');

            const href = link.getAttribute('href');

            if (href.includes('#')) {
                const [page, hash] = href.split('#');

                if (
                    (currentHash === `#${hash}` && currentPath === page) ||
                    (hash === 'home-section' && currentHash === '' && currentPath === page)
                ) {
                    link.classList.add('current');
                }
            } else {
                if (href === currentPath) {
                    link.classList.add('current');
                }
            }
        });
    };

    setActiveLink();

    // Update active state on scroll (homepage only)
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        window.addEventListener('scroll', () => {
            const aboutTop = aboutSection?.offsetTop || 0;
            const scrollPos = window.scrollY + 120;

            navLinks.forEach(link => link.classList.remove('current'));

            if (scrollPos >= aboutTop) {
                document.querySelector('a[href="index.html#about-section"]')?.classList.add('current');
            } else {
                document.querySelector('a[href="index.html#home-section"]')?.classList.add('current');
            }
        });
    }

});





