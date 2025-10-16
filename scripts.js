document.addEventListener('DOMContentLoaded', () => {
  // ===========================
  // THEME TOGGLE + PROFILE IMAGE
  // ===========================
  const themeToggle = document.getElementById('theme-toggle');
  const profilePic = document.getElementById('profile-pic');

  const applyTheme = (dark) => {
    document.body.classList.toggle('dark-mode', dark);
    themeToggle.textContent = dark ? '☀️' : '🌙';
    localStorage.setItem('darkMode', dark ? '1' : '0');

    if (profilePic) {
      const newSrc = dark ? 'image/overlay.png' : 'image/profil1.png';
      profilePic.src = newSrc;
      profilePic.onerror = () => console.error(`Fehler beim Laden des Bildes: ${newSrc}`);
    }
  };

  applyTheme(localStorage.getItem('darkMode') === '1');
    themeToggle.addEventListener('click', () => {
    const dark = !document.body.classList.contains('dark-mode');
    applyTheme(dark);
    updateParticles(dark);
  });

  
  // ===========================
  // BANNER MANAGER
  // ===========================
  class BannerManager {
    constructor() {
      this.banner = document.getElementById('availability-banner');
      this.closeBtn = document.getElementById('close-banner');
      this.toggleBtn = document.getElementById('toggle-banner');
      this.toggleIcon = document.getElementById('toggle-icon');
      this.globalToggle = document.getElementById('global-toggle');
      this.isOpen = localStorage.getItem('bannerState') !== 'closed';
      this.init();
    }

    init() {
      if (this.banner) {
      // Zeige Banner standardmäßig, wenn es nicht geschlossen ist
      this.isOpen = localStorage.getItem('bannerState') !== 'closed';

      if (this.isOpen) {
        this.showBanner();
      } else {
        this.hideBanner();
        this.banner.style.display = 'block'; // sicherstellen, dass es sichtbar ist
      }
    }

      this.closeBtn?.addEventListener('click', () => this.closeBanner());
      this.toggleBtn?.addEventListener('click', () => this.toggleBanner());
      this.globalToggle?.addEventListener('click', () => this.toggleBanner());

      // Kontakt-Link-Scroll
      window.scrollToContact = () => {
        const contact = document.getElementById('contact');
        if (contact) {
          const yOffset = -80; // Header offset
          const y = contact.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      };
    }

    showBanner() {
      this.banner.classList.add('show');
      this.isOpen = true;
      document.body.classList.add('banner-open');
      localStorage.setItem('bannerState', 'open');
      this.toggleIcon?.classList.replace('bi-chevron-down', 'bi-chevron-up');
      if (this.globalToggle) {
        this.globalToggle.classList.remove('d-none');
        this.globalToggle.innerHTML = '<i class="bi bi-calendar-check"></i> <span class="d-none d-md-inline">Verfügbar</span>';
      }
    }

    hideBanner() {
    this.banner.classList.remove('show');
    this.banner.style.display = 'block'; // ← bleibt sichtbar für Toggle-Button
    this.isOpen = false;
    document.body.classList.remove('banner-open');
    localStorage.setItem('bannerState', 'closed');
    this.toggleIcon?.classList.replace('bi-chevron-up', 'bi-chevron-down');
  }


    toggleBanner() {
      this.isOpen ? this.hideBanner() : this.showBanner();
    }

    closeBanner() {
      this.hideBanner();
    }
  }

  new BannerManager();

  // ===========================
  // SMOOTH SCROLL NAVIGATION
  // ===========================
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href?.startsWith('#')) {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
          const yOffset = -80; // Header offset
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }
    });
  });

  // ===========================
  // BACK TO TOP BUTTON
  // ===========================
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('d-none', window.pageYOffset <= 100);
    });
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // ===========================
  // BOOTSTRAP TOOLTIPS
  // ===========================
  try {
    document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => new bootstrap.Tooltip(el));
  } catch (e) {
    console.warn('Tooltip initialization failed:', e);
  }

  // ===========================
  // SCROLL REVEAL PROJECTS (IntersectionObserver)
  // ===========================
  const cards = document.querySelectorAll('#projects .card');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('fade-in');
      });
    }, { threshold: 0.2 });
    cards.forEach(card => observer.observe(card));
  } else {
    // fallback
    const reveal = () => {
      const triggerBottom = window.innerHeight * 0.8;
      cards.forEach(card => {
        if (card.getBoundingClientRect().top < triggerBottom) {
          card.classList.add('fade-in');
        }
      });
    };
    window.addEventListener('scroll', reveal);
    reveal();
  }

  if (window.particlesJS) {
  try {
    particlesJS('particles-js', {
      particles: {
        number: { value: 50, density: { enable: true, value_area: 800 } },
        color: { value: '#007bff' },
        shape: { type: 'circle' },
        opacity: { value: 0.6, random: true },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 150, color: '#007bff', opacity: 0.3, width: 1 },
        move: { enable: true, speed: 2, direction: 'none', out_mode: 'out' }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: { enable: true, mode: 'repulse' },
          onclick: { enable: true, mode: 'push' }
        },
        modes: {
          repulse: { distance: 100 },
          push: { particles_nb: 4 }
        }
      },
      retina_detect: true
    });
  } catch (e) {
    console.warn('Particles init failed:', e);
  }

  updateParticles(document.body.classList.contains('dark-mode'));
}
// ===========================
// PARTICLES BACKGROUND
// ===========================
const updateParticles = (dark) => {
  const color = dark ? '#ff9800' : '#007bff'; // Orange für Dark, Blau für Light
  if (window.pJSDom && window.pJSDom.length) {
    const pJS = window.pJSDom[0].pJS;
    pJS.particles.color.value = color;
    pJS.particles.line_linked.color = color;
    pJS.fn.particlesRefresh(); // ← wichtig, damit es live aktualisiert!
  }
};



  // ===========================
  // CONTACT FORM SUBMISSION
  // ===========================
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('[type="submit"]');
      submitBtn.disabled = true;
      const formData = new FormData(form);
      try {
        const res = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });
        alert(res.ok ? 'Danke! Deine Nachricht wurde gesendet.' : 'Hoppla! Etwas ist schiefgelaufen.');
        if (res.ok) form.reset();
      } catch (err) {
        console.error('Form submission failed:', err);
        alert('Hoppla! Etwas ist schiefgelaufen.');
      } finally {
        submitBtn.disabled = false;
      }
    });
  }

  // ===========================
  // Hover-Effekt für Projektkarten (optional, CSS reicht auch)
  // ===========================
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', () => card.classList.add('hovered'));
    card.addEventListener('mouseleave', () => card.classList.remove('hovered'));
  });
});