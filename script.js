// ===== Main JS for Multi-Page Site =====
document.addEventListener('DOMContentLoaded', () => {

    const navbar = document.querySelector('nav');
    const aboutSection = document.getElementById('about-section');
    const navLinks = document.querySelectorAll('.nav-links a');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');

    // ==================================================
    // ===== HAMBURGER MENU =====
    // ==================================================
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('show');
            hamburger.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('show');
            });
        });
    }

    // ==============================
    // ===== GALLERY LIGHTBOX =====
    // ==============================
    const mediaSection = document.getElementById('media');

    if (mediaSection) {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxVideo = document.getElementById('lightbox-video');
        const closeBtn = lightbox?.querySelector('.close');

        if (!lightbox || !lightboxImg || !lightboxVideo || !closeBtn){
             // skip gallery but DON'T kill the rest of the script
        } else {

            const allChildren = Array.from(
                mediaSection.querySelectorAll('.media-grid > *')
            );

            const galleryItems = allChildren.map(child => {
                if (child.classList.contains('video-thumb')) {
                    return {
                        type: 'video',
                        src: "https://www.youtube.com/embed/U7sqc4bP6Ww"
                    };
                }
                return {
                    type: 'image',
                    src: child.querySelector('img') 
                        ? child.querySelector('img').src 
                        : child.src
                };
            });

            let currentIndex = 0;

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

            allChildren.forEach((child, index) => {
                child.addEventListener('click', () => openLightbox(index));
            });

            closeBtn.addEventListener('click', closeLightbox);

            lightbox.addEventListener('click', e => {
                if (e.target === lightbox) closeLightbox();
            });

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

            document.addEventListener('keydown', (e) => {
                if (lightbox.style.display !== 'flex') return;
                if (e.key === 'ArrowRight') next();
                if (e.key === 'ArrowLeft') prev();
                if (e.key === 'Escape') closeLightbox();
            });
        }
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
    // ===== NAVBAR SCROLL EFFECT =====
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
   const sections = document.querySelectorAll("section");

    const updateActiveLink = () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;

        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("current");

        const href = link.getAttribute("href");

        if (href.includes("#")) {
            const targetId = href.split("#")[1];

            if (targetId === current) {
                link.classList.add("current");
            }
        }
    });
};

// Run on scroll
window.addEventListener("scroll", updateActiveLink);

// CRITICAL: run once on page load
updateActiveLink();



    // ==============================
    // ===== CONTACT COUNTER =====
    // ==============================
    const textarea = document.getElementById("message");
    const charCount = document.getElementById("charCount");

    if (textarea && charCount) {
        const maxLength = textarea.maxLength > 0 ? textarea.maxLength : 500;

        const updateCounts = () => {
            const charLength = textarea.value.length;

            charCount.textContent = `${charLength} / ${maxLength} characters`;

            charCount.classList.remove("halfway", "warning", "limit");

            if (charLength >= maxLength) {
                charCount.classList.add("limit");      // red
            } else if (charLength >= maxLength * 0.75) {
                charCount.classList.add("warning");    // orange
            } else if (charLength >= maxLength * 0.5) {
                charCount.classList.add("halfway");    // yellow
            }
        };

        textarea.addEventListener("input", updateCounts);
        updateCounts();
    }

    // ==============================
    // ===== CUSTOM FORM SUBMIT =====
    // ==============================
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
