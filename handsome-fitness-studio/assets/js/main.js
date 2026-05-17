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
