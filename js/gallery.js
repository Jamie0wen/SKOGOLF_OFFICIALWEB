// =========================================================
// GALLERY.JS — gallery.html only
// Load AFTER base.js.
// =========================================================
document.addEventListener('DOMContentLoaded', () => {

    const mediaSection = document.getElementById('media');
    if (!mediaSection) return;

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxVideo = document.getElementById('lightbox-video');
    const closeBtn = lightbox?.querySelector('.close');

    if (!lightbox || !lightboxImg || !lightboxVideo || !closeBtn) return;

    // Only read the FIRST .media-grid — the second one in the HTML
    // is a visual-only duplicate used to create the seamless
    // scrolling-marquee effect, and shouldn't be a second set of
    // clickable/lightbox-indexed items.
    const primaryGrid = mediaSection.querySelector('.media-track > .media-grid');
    const allChildren = Array.from(primaryGrid.children);

    const galleryItems = allChildren.map(child => {
        if (child.classList.contains('video-thumb')) {
            return {
                type: 'video',
                src: 'https://www.youtube.com/embed/U7sqc4bP6Ww'
            };
        }
        return {
            type: 'image',
            src: child.querySelector('img') ? child.querySelector('img').src : child.src
        };
    });

    let currentIndex = 0;

    const renderItem = (index) => {
        const item = galleryItems[index];

        lightboxVideo.src = '';
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
                lightboxVideo.src = item.src + '?autoplay=1';
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
        lightboxImg.src = '';
        lightboxVideo.src = '';
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

});