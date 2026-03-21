// ===== Main JS for Multi-Page Site =====
document.addEventListener('DOMContentLoaded', () => {

    // ===== Gallery Lightbox & Drag-to-Scroll =====
    const mediaSection = document.getElementById('media');
    if (mediaSection) {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = lightbox.querySelector('img');
        const closeBtn = lightbox.querySelector('.close');
        const images = Array.from(mediaSection.querySelectorAll('.media-grid img'));

        // Create navigation arrows if they don't already exist
        let prevBtn = lightbox.querySelector('.nav-arrow.prev');
        let nextBtn = lightbox.querySelector('.nav-arrow.next');

        if (!prevBtn && !nextBtn) {
            prevBtn = document.createElement('span');
            nextBtn = document.createElement('span');
            prevBtn.className = 'nav-arrow prev';
            nextBtn.className = 'nav-arrow next';
            prevBtn.innerHTML = '&#10094;'; // left arrow
            nextBtn.innerHTML = '&#10095;'; // right arrow
            lightbox.appendChild(prevBtn);
            lightbox.appendChild(nextBtn);
        }

        let currentIndex = 0;

        function showLightbox(index) {
            currentIndex = index;
            lightboxImg.src = images[index].src;
            lightboxImg.alt = images[index].alt;
            lightbox.style.display = 'flex';
        }

        images.forEach((img, index) => {
            img.addEventListener('click', () => showLightbox(index));
        });

        // Close lightbox
        closeBtn.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });

        lightbox.addEventListener('click', e => {
            if (e.target === lightbox) lightbox.style.display = 'none';
        });

        // Navigate images
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

        // Drag-to-scroll for media grid
        const slider = mediaSection.querySelector('.media-grid');
        let isDown = false, startX, scrollLeft;

        slider.addEventListener('mousedown', e => {
            isDown = true;
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });
        slider.addEventListener('mouseleave', () => isDown = false);
        slider.addEventListener('mouseup', () => isDown = false);
        slider.addEventListener('mousemove', e => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2; // scroll speed
            slider.scrollLeft = scrollLeft - walk;
        });
    }

    // ===== Golf Bag Page JS =====
    const bagSection = document.getElementById('golf-bag');
    if (bagSection) {
        // Any golf-bag-specific JS can go here
    }

});



// Smooth scroll to About section
document.querySelectorAll('a[href^="index.html#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href').split('#')[1];
        const targetElement = document.getElementById(targetId);

        if (targetElement && window.location.pathname.endsWith('index.html')) {
            e.preventDefault();
            window.scrollTo({
                top: targetElement.offsetTop - 60, // adjust for navbar height
                behavior: 'smooth'
            });
        }
    });
});


//Navbar Color Change on Scroll

const navbar = document.querySelector('nav');
const aboutSection = document.getElementById('about-section');

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY + navbar.offsetHeight;

    if (scrollPosition >= aboutSection.offsetTop) {
        navbar.classList.add('navbar-about');
    } else {
        navbar.classList.remove('navbar-about');
    }
});