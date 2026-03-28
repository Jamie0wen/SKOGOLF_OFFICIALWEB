// ===== Main JS for Multi-Page Site =====
document.addEventListener('DOMContentLoaded', () => {

    const navbar = document.querySelector('nav');
    const aboutSection = document.getElementById('about-section');
    const navLinks = document.querySelectorAll('.nav-links a');
// ==============================
// ===== GALLERY LIGHTBOX =====
// ==============================
const mediaSection = document.getElementById('media');

if (mediaSection) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxVideo = document.getElementById('lightbox-video');
    const closeBtn = lightbox?.querySelector('.close');

    // ✅ ONLY TARGET FIRST GRID (ignores duplicate)
    const grid = mediaSection.querySelector('.media-grid:first-child');

    if (!lightbox || !lightboxImg || !lightboxVideo || !closeBtn || !grid) return;

    const children = Array.from(grid.children);

    // Build gallery from FIRST grid only
    const galleryItems = children.map(child => {
        if (child.classList.contains('video-thumb')) {
            return {
                type: 'video',
                src: "https://www.youtube.com/embed/U7sqc4bP6Ww"
            };
        }
        return {
            type: 'image',
            src: child.src
        };
    });

    let currentIndex = 0;

    // Create arrows once
    let prevBtn = lightbox.querySelector('.nav-arrow.prev');
    let nextBtn = lightbox.querySelector('.nav-arrow.next');

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

    // ===== RENDER =====
    const renderItem = (index) => {
        const item = galleryItems[index];

        // 🔥 ALWAYS STOP VIDEO
        lightboxVideo.src = "";

        lightboxImg.style.opacity = 0;
        lightboxVideo.style.opacity = 0;

        setTimeout(() => {
            if (item.type === 'image') {
                lightboxImg.style.display = 'block';
                lightboxVideo.style.display = 'none';
                lightboxImg.src = item.src;
            } else {
                lightboxImg.style.display = 'none';
                lightboxVideo.style.display = 'block';
                lightboxVideo.src = item.src + "?autoplay=1";
            }

            lightboxImg.style.opacity = 1;
            lightboxVideo.style.opacity = 1;
        }, 120);
    };

    const openLightbox = (index) => {
        currentIndex = index;
        lightbox.style.display = 'flex';
        renderItem(index);
    };

    const closeLightbox = () => {
        lightbox.style.display = 'none';
        lightboxImg.src = "";
        lightboxVideo.src = "";
    };

    const next = () => {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        renderItem(currentIndex);
    };

    const prev = () => {
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        renderItem(currentIndex);
    };

    // ===== CLICK EVENTS =====
    children.forEach((child, index) => {
        child.addEventListener('click', () => openLightbox(index));
    });

    closeBtn.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', e => {
        if (e.target === lightbox) closeLightbox();
    });

    nextBtn.addEventListener('click', e => {
        e.stopPropagation();
        next();
    });

    prevBtn.addEventListener('click', e => {
        e.stopPropagation();
        prev();
    });

    // ===== KEYBOARD =====
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display !== 'flex') return;

        if (e.key === 'ArrowRight') next();
        if (e.key === 'ArrowLeft') prev();
        if (e.key === 'Escape') closeLightbox();
    });

    // ===== SWIPE =====
    let touchStartX = 0;

    lightbox.addEventListener('touchstart', e => {
        touchStartX = e.touches[0].clientX;
    });

    lightbox.addEventListener('touchend', e => {
        const diff = touchStartX - e.changedTouches[0].clientX;

        if (Math.abs(diff) > 50) {
            diff > 0 ? next() : prev();
        }
    });

    // ❌ REMOVED DRAG SCROLL (conflicts with auto-scroll)
}

    // ==============================
    // ===== NAVBAR BLUR (HOMEPAGE ONLY) =====
    // ==============================
    if (navbar && aboutSection) {

        const navHeight = navbar.offsetHeight;

        window.addEventListener('scroll', () => {
            const triggerPoint = aboutSection.offsetTop - navHeight;

            if (window.scrollY > triggerPoint) {
                navbar.classList.add('nav-scrolled');
            } else {
                navbar.classList.remove('nav-scrolled');
            }
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

    // ==============================
    // ===== ACTIVE LINK ON SCROLL =====
    // ==============================
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


// ==================================================
// ===== Bypass Formspree -> custom succes page =====
// ==================================================

// ==================================================
// ===== Custom Form Redirect (Formspree Fix) =====
// ==================================================

const form = document.getElementById('contact-form');

if (form) {
  form.addEventListener('submit', async function(e) {
    e.preventDefault();

    const data = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        window.location.href = "/SKOGOLF_OFFICIALWEB/success.html";
      } else {
        alert("Error submitting form");
      }
    } catch (error) {
      alert("Network error");
    }
  });
}
