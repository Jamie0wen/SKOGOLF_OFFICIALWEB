// ===== Gallery Lightbox with Left/Right Navigation & Drag-to-Scroll =====
const mediaSection = document.getElementById('media');

if (mediaSection) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox.querySelector('img');
    const closeBtn = lightbox.querySelector('.close');
    const images = Array.from(document.querySelectorAll('.media-grid img'));
    
    // Create navigation arrows
    const prevBtn = document.createElement('span');
    const nextBtn = document.createElement('span');
    prevBtn.classList.add('nav-arrow', 'prev');
    nextBtn.classList.add('nav-arrow', 'next');
    prevBtn.innerHTML = '&#10094;'; // Left arrow
    nextBtn.innerHTML = '&#10095;'; // Right arrow
    lightbox.appendChild(prevBtn);
    lightbox.appendChild(nextBtn);

    let currentIndex = 0;

    // Show lightbox with selected image
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
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showLightbox(currentIndex);
    });

    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % images.length;
        showLightbox(currentIndex);
    });

    // --- Drag-to-Scroll ---
    const slider = document.querySelector('.media-grid');
    let isDown = false, startX, scrollLeft;

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener('mouseleave', () => { isDown = false; slider.classList.remove('active'); });
    slider.addEventListener('mouseup', () => { isDown = false; slider.classList.remove('active'); });
    slider.addEventListener('mousemove', (e) => {
        if(!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
    });
}

// ===== Additional JS for other pages =====
const bagSection = document.getElementById('golf-bag');
if (bagSection) {
    // Any golf-bag-specific JS can go here
}




