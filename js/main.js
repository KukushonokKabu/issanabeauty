document.addEventListener('DOMContentLoaded', function() {
  // ===== МОБИЛЬНОЕ МЕНЮ =====
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav');
  if (burger && nav) {
    burger.addEventListener('click', () => nav.classList.toggle('active'));
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => nav.classList.remove('active'));
    });
  }

  // ===== АНИМАЦИЯ ПРИ СКРОЛЛЕ =====
  const fadeElements = document.querySelectorAll('.feature-card, .philosophy-card, .service-card, .review-card, .schedule-highlight');
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
  fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    fadeObserver.observe(el);
  });

  // ===== ЛАЙТБОКС =====
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
    const lbImg = lightbox.querySelector('img');
    let idx = 0;
    const imgs = Array.from(galleryItems);
    const open = i => { idx = i; lbImg.src = imgs[idx].src; lbImg.alt = imgs[idx].alt; lightbox.classList.add('active'); document.body.style.overflow = 'hidden'; };
    const close = () => { lightbox.classList.remove('active'); document.body.style.overflow = ''; };
    const next = () => { idx = (idx + 1) % imgs.length; lbImg.src = imgs[idx].src; };
    const prev = () => { idx = (idx - 1 + imgs.length) % imgs.length; lbImg.src = imgs[idx].src; };
    imgs.forEach((img, i) => img.parentElement.addEventListener('click', () => open(i)));
    lightbox.querySelector('.lightbox-close').addEventListener('click', close);
    lightbox.querySelector('.lightbox-next').addEventListener('click', next);
    lightbox.querySelector('.lightbox-prev').addEventListener('click', prev);
    lightbox.addEventListener('click', e => { if (e.target === lightbox) close(); });
    document.addEventListener('keydown', e => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    });
  }

  // ===== ЧАСТИЦЫ В HERO =====
  const hero = document.querySelector('.hero');
  if (hero) {
    const pc = document.createElement('div');
    pc.className = 'hero-particles';
    for (let i = 0; i < 6; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      pc.appendChild(p);
    }
    hero.insertBefore(pc, hero.firstChild);
  }

  // ===== TELEGRAM КНОПКИ (МОБИЛЬНЫЙ / ДЕСКТОП) =====
  document.addEventListener('click', function(e) {
    const link = e.target.closest('.js-tg-link');
    if (!link) return;
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.button === 1) return;
    
    e.preventDefault();
    const username = link.dataset.username || 'issanabeauty';
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    
    if (isMobile) {
      window.location.href = `tg://resolve?domain=${username}`;
      setTimeout(() => {
        window.open(`https://t.me/${username}`, '_blank', 'noopener');
      }, 2000);
    } else {
      window.open(`https://t.me/${username}`, '_blank', 'noopener');
    }
  });
});
