document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle and Profile Image
  const themeToggle = document.getElementById('theme-toggle');
  const profilePic = document.getElementById('profile-pic');

  const applyTheme = (dark) => {
    document.body.classList.toggle('dark-mode', dark);
    themeToggle.innerHTML = dark ? '☀️' : '🌙';
    localStorage.setItem('darkMode', dark ? '1' : '0');
    if (profilePic) {
      const newSrc = dark ? 'image/overlay.png' : 'image/profil1.png';
      profilePic.src = newSrc;
      profilePic.onerror = () => console.error(`Fehler beim Laden des Bildes: ${newSrc}`);
    }
  };

  applyTheme(localStorage.getItem('darkMode') === '1');
  themeToggle.addEventListener('click', () => applyTheme(!document.body.classList.contains('dark-mode')));

  // Availability Banner
  const banner = document.getElementById('availability-banner');
  const bannerClose = document.getElementById('banner-close');
  if (banner && bannerClose) {
    banner.classList.remove('hidden'); // Standardmäßig sichtbar
    if (sessionStorage.getItem('bannerClosed') === '1') {
      banner.classList.add('hidden');
    }
    bannerClose.addEventListener('click', () => {
      banner.classList.add('hidden');
      sessionStorage.setItem('bannerClosed', '1');
    });
  }

  // Smooth Scroll for Navigation Links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (ev) => {
      const href = link.getAttribute('href') || '';
      if (href.startsWith('#')) {
        ev.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Back to Top Button
  const backToTop = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 100) {
      backToTop.classList.remove('d-none');
    } else {
      backToTop.classList.add('d-none');
    }
  });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Tooltips
  try {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.forEach(el => new bootstrap.Tooltip(el));
  } catch (e) {
    console.warn('Tooltip initialization failed:', e);
  }

  // Scroll Reveal for Projects
  const cards = document.querySelectorAll('#projects .card');
  const reveal = () => {
    const triggerBottom = window.innerHeight * 0.8;
    cards.forEach(card => {
      const cardTop = card.getBoundingClientRect().top;
      if (cardTop < triggerBottom) card.classList.add('fade-in');
    });
  };
  window.addEventListener('scroll', reveal);
  reveal();

  // Particles Background
  if (window.particlesJS) {
    try {
      particlesJS('particles-js', {
        particles: {
          number: { value: 20 },
          color: { value: '#007bff' },
          size: { value: 3, random: true },
          move: { speed: 1.5, out_mode: 'out' },
        },
        interactivity: { events: { onhover: { enable: true, mode: 'repulse' } } }
      });
    } catch (e) {
      console.warn('Particles initialization failed:', e);
    }
  }

  // Contact Form Submission (Formspree)
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });
        if (response.ok) {
          alert('Danke! Deine Nachricht wurde gesendet.');
          form.reset();
        } else {
          alert('Hoppla! Etwas ist schiefgelaufen.');
        }
      } catch (e) {
        console.error('Form submission failed:', e);
        alert('Hoppla! Etwas ist schiefgelaufen.');
      }
    });
  }
});