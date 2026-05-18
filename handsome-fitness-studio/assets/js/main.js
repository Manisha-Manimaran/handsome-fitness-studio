document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      hamburger.classList.toggle('active');
    });
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
      });
    });
  }

  document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    link.addEventListener('click', () => {
      if (window.goatcounter) {
        goatcounter.count({ event: true, title: 'whatsapp-click' });
      }
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});

function sendEnquiry() {
  const form = document.getElementById('contactForm');
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const goal = document.getElementById('goal').value;
  const message = document.getElementById('message').value.trim();
  if (!name || !phone) { alert('Please enter your name and phone number.'); return; }
  const goalLabel = goal ? document.querySelector('#goal option[value="' + goal + '"]').textContent : 'Not specified';
  const text = 'Hi Handsome Fitness Studio, I would like to enquire about your membership plans.%0A%0AName: ' + encodeURIComponent(name) + '%0APhone: ' + encodeURIComponent(phone) + '%0AGoal: ' + encodeURIComponent(goalLabel) + (message ? '%0AMessage: ' + encodeURIComponent(message) : '');
  window.open('https://wa.me/' + form.dataset.whatsapp + '?text=' + text, '_blank');
  if (window.goatcounter) { goatcounter.count({ event: true, title: 'whatsapp-click' }); }
}

(function() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  const cards = document.querySelectorAll('.gallery-card');
  let currentIndex = 0;
  const images = [];

  cards.forEach(card => {
    const img = card.querySelector('img');
    images.push(img.src);
    card.addEventListener('click', () => {
      currentIndex = parseInt(card.dataset.index);
      openLightbox(images[currentIndex]);
    });
  });

  function openLightbox(src) {
    lightboxImg.src = src;
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.style.display = 'none';
    document.body.style.overflow = '';
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    lightboxImg.src = images[currentIndex];
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    lightboxImg.src = images[currentIndex];
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener('click', showPrev);
  if (lightboxNext) lightboxNext.addEventListener('click', showNext);

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'flex') {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    }
  });
})();

(function() {
  const cards = document.querySelectorAll('.testimonial-card');
  cards.forEach(card => {
    const textEl = card.querySelector('.testimonial-text');
    const btn = card.querySelector('.read-more-btn');
    if (!textEl || !btn) return;

    const fullText = textEl.dataset.fullText;
    const truncatedText = textEl.dataset.truncatedText;
    if (!fullText || !truncatedText) return;

    btn.textContent = 'Read More';
    btn.style.display = 'block';

    btn.addEventListener('click', () => {
      const isExpanded = card.classList.contains('expanded');
      if (isExpanded) {
        card.classList.remove('expanded');
        textEl.textContent = '"' + truncatedText + '"';
        btn.textContent = 'Read More';
      } else {
        card.classList.add('expanded');
        textEl.textContent = '"' + fullText + '"';
        btn.textContent = 'Show Less';
      }
    });
  });
})();
