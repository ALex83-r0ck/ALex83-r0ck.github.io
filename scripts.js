document.addEventListener('DOMContentLoaded', () => {

  // Availability Banner
  const banner = document.getElementById('availability-banner');
  const bannerClose = document.getElementById('banner-close');
  if (banner && bannerClose) {
    banner.style.display = localStorage.getItem('bannerClosed') === '1' ? 'none' : 'block';
    bannerClose.addEventListener('click', () => {
      banner.style.display = 'none';
      localStorage.setItem('bannerClosed', '1');
    });
  }

  // Theme Toggle (Dark/Light)
  const themeToggle = document.getElementById('theme-toggle');
  const profilePic = document.getElementById('profile-pic');
  const darkImgSource = document.getElementById('dark-img');
  const applyTheme = (dark) => {
    document.body.classList.toggle('dark-mode', dark);
    themeToggle.innerHTML = dark ? '☀️' : '🌙';
    localStorage.setItem('darkMode', dark ? '1' : '0');
    // Update profile image based on theme
    if (profilePic && darkImgSource) {
      profilePic.src = dark ? darkImgSource.srcset : 'image/profil1.png';
    }
  };
  applyTheme(localStorage.getItem('darkMode') === '1');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => applyTheme(!document.body.classList.contains('dark-mode')));
  }

  // Smooth Scroll for nav links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', ev => {
      const href = link.getAttribute('href') || '';
      if (href.startsWith('#')) {
        ev.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Tooltips
  try {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.forEach(el => new bootstrap.Tooltip(el));
  } catch (e) {
    console.warn('Tooltip init failed');
  }

  // Scroll Reveal for Projects
  const cards = document.querySelectorAll('#projects .card');
  const reveal = () => {
    const triggerBottom = window.innerHeight * 0.9;
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
          number: { value: 25 },
          color: { value: '#007bff' },
          size: { value: 3 },
          move: { speed: 1.5 }
        },
        interactivity: { events: { onhover: { enable: true, mode: 'repulse' } } }
      });
    } catch (e) {
      console.warn('Particles init failed');
    }
  }

  // Contact Form Submission (Formspree)
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) {
        alert("Danke! Deine Nachricht wurde gesendet.");
        form.reset();
      } else {
        alert("Hoppla! Etwas ist schiefgelaufen.");
      }
    });
  }
});