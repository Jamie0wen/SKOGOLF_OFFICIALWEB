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

    if (!lightbox || !lightboxImg || !lightboxVideo || !closeBtn) return;

    // ✅ Get ALL items (both grids)
    const allChildren = Array.from(
        mediaSection.querySelectorAll('.media-grid > *')
    );

    // ✅ Build gallery
    const galleryItems = allChildren.map(child => {
        if (child.classList.contains('video-thumb')) {
            return {
                type: 'video',
                src: "https://www.youtube.com/embed/U7sqc4bP6Ww"
            };
        }
        return {
            type: 'image',
            src: child.querySelector('img') ? child.querySelector('img').src : child.src
        };
    });

    let currentIndex = 0;

    // ===== RENDER =====
    const renderItem = (index) => {
        const item = galleryItems[index];

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

    // ===== CLICK EVENTS (FIXED) =====
    allChildren.forEach((child, index) => {
        child.addEventListener('click', () => openLightbox(index));
    });

    // ===== CONTROLS =====
    closeBtn.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', e => {
        if (e.target === lightbox) closeLightbox();
    });

    // Arrows
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

    prevBtn.onclick = (e) => {
        e.stopPropagation();
        prev();
    };

    nextBtn.onclick = (e) => {
        e.stopPropagation();
        next();
    };

    // Keyboard
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display !== 'flex') return;
        if (e.key === 'ArrowRight') next();
        if (e.key === 'ArrowLeft') prev();
        if (e.key === 'Escape') closeLightbox();
    });
}

// ==============================
// ===== SMOOTH SCROLL =====
// ==============================
navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href.includes('#')) return;
        const [page, hash] = href.split('#');
        const target = document.getElementById(hash);
        const onHomePage =
            window.location.pathname.includes('index.html') ||
            window.location.pathname === '/';
        if (target && onHomePage) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
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

