document.addEventListener('DOMContentLoaded', function() {

    // ===== МОБИЛЬНОЕ МЕНЮ =====
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav');

    if (burger && nav) {
        burger.addEventListener('click', function() {
            nav.classList.toggle('active');
        });

        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
            });
        });
    }

    // ===== АНИМАЦИЯ ПРИ СКРОЛЛЕ =====
    const fadeElements = document.querySelectorAll('.feature-card, .philosophy-card, .service-card, .review-card, .schedule-highlight');

    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                fadeObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
        fadeObserver.observe(el);
    });

    // ===== ЛАЙТБОКС ДЛЯ ГАЛЕРЕИ =====
    const galleryItems = document.querySelectorAll('.gallery-item img');
    if (galleryItems.length > 0) {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <button class="lightbox-close">&times;</button>
            <button class="lightbox-nav lightbox-prev">&#8249;</button>
            <button class="lightbox-nav lightbox-next">&#8250;</button>
            <img src="" alt="">
        `;
        document.body.appendChild(lightbox);

        const lightboxImg = lightbox.querySelector('img');
        const closeBtn = lightbox.querySelector('.lightbox-close');
        const prevBtn = lightbox.querySelector('.lightbox-prev');
        const nextBtn = lightbox.querySelector('.lightbox-next');
        let currentIndex = 0;
        const imagesArray = Array.from(galleryItems);

        function openLightbox(index) {
            currentIndex = index;
            lightboxImg.src = imagesArray[currentIndex].src;
            lightboxImg.alt = imagesArray[currentIndex].alt;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }

        function nextImage() {
            currentIndex = (currentIndex + 1) % imagesArray.length;
            lightboxImg.src = imagesArray[currentIndex].src;
        }

        function prevImage() {
            currentIndex = (currentIndex - 1 + imagesArray.length) % imagesArray.length;
            lightboxImg.src = imagesArray[currentIndex].src;
        }

        imagesArray.forEach((img, index) => {
            img.parentElement.addEventListener('click', () => openLightbox(index));
        });

        closeBtn.addEventListener('click', closeLightbox);
        nextBtn.addEventListener('click', nextImage);
        prevBtn.addEventListener('click', prevImage);

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });

        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
        });
    }

    // ===== ПЛАВАЮЩИЕ ЧАСТИЦЫ В HERO =====
    const hero = document.querySelector('.hero');
    if (hero) {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'hero-particles';
        for (let i = 0; i < 6; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particlesContainer.appendChild(particle);
        }
        hero.insertBefore(particlesContainer, hero.firstChild);
    }

});