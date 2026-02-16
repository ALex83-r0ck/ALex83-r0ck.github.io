/**
 * Pill-Aktion: Scroll-Up oder Kontakt
 */
function handlePillAction() {
    const pill = document.getElementById('availability-pill');
    const contactSection = document.getElementById('contact');
    const nameInput = document.getElementById('name');

    if (pill && pill.classList.contains('minimized')) {
        // Wenn minimiert: Nach oben scrollen
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        // Wenn oben: Zum Kontakt-Bereich scrollen
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
            
            // Warte kurz, bis der Scrollvorgang fast fertig ist, dann Fokus
            setTimeout(() => {
                if (nameInput) {
                    nameInput.focus({ preventScroll: true });
                }
            }, 800); // 800ms passt meistens perfekt zur Scroll-Dauer
        }
    }
}
document.addEventListener('DOMContentLoaded', () => {
  // ===========================
  // THEME TOGGLE + PROFILE IMAGE
  // ===========================
  const themeToggle = document.getElementById('theme-toggle');
  const profilePic = document.getElementById('profile-pic');
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('name');

  const applyTheme = (dark) => {
    document.body.classList.toggle('dark-mode', dark);
    themeToggle.textContent = dark ? '☀️' : '🌙';
    localStorage.setItem('darkMode', dark ? '1' : '0');

    if (profilePic) {
      const newSrc = dark ? 'image/overlay.png' : 'image/1000057922.png';
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

  if (contactForm && nameInput) {
  const focusObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // Wenn das Formular zu 50% sichtbar ist
      if (entry.isIntersecting) {
        nameInput.focus({ preventScroll: true }); 
        // Observer stoppen, damit es nur einmal passiert
        focusObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  focusObserver.observe(contactForm);
}

  
// ===========================
// BANNER MANAGER V4 (new: pill ab version 4.0)
// ===========================
const pill = document.getElementById('availability-pill')
if (pill) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 200) {
        // Pill wird zum runden Button rechts unten
        pill.classList.add('minimized');
        pill.classList.remove('glitch-effect'); 
      } else {
        // Pill wird wieder zur breiten Leiste oben
        pill.classList.remove('minimized');
      }
    });
  }

  // Die Action, wenn man auf die Pill klickt (egal ob Leiste oder Kreis)
  window.handlePillAction = () => {
    const contactSection = document.getElementById('contact');
    const nameInput = document.getElementById('name');

    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      // Kleiner Delay, bis der Scrollvorgang fast fertig ist, dann Fokus
      setTimeout(() => {
        nameInput?.focus();
      }, 800);
    }
  };

  window.handlePillAction = () => {
    const pill = document.getElementById('availability-pill');
    
    if (pill && pill.classList.contains('minimized')) {
        // AKTION UNTEN: Zurück nach oben
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        // AKTION OBEN: Zum Kontakt
        const contact = document.getElementById('contact');
        contact?.scrollIntoView({ behavior: 'smooth' });
    }
};

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
          const yOffset = -30; // Header offset
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }
    });
  });

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
  
// ===========================
// PARTICLES BACKGROUND
// ===========================
const updateParticles = (dark) => {
  const color = dark ? '#ff9800' : '#054def'; // Orange für Dark, Blau für Light
  if (window.pJSDom && window.pJSDom.length) {
    const pJS = window.pJSDom[0].pJS;
    pJS.particles.color.value = color;
    pJS.particles.line_linked.color = color;
    pJS.fn.particlesRefresh(); 
  }
};

// ===========================
// INIT PARTICLES BACKGROUND
// ===========================
if (window.particlesJS) {
  try {
    particlesJS('particles-js', {
      particles: {
        number: { value: 10, density: { enable: true, value_area: 130 } },
        color: { value: '#054def' },
        shape: { type: 'circle' },
        opacity: { value: 0.5, random: true },
        size: { value: 18, random: true },
        // ✨ wichtig: im Light Mode keine Linien
        line_linked: { enable: !document.body.classList.contains('dark-mode'), distance: 100, color: '#007bff', opacity: 0.5, width: 2 },
        move: { enable: true, speed: 2.1, out_mode: 'out' }
      },
      interactivity: {
        events: { onhover: { enable: true, mode: 'repulse' } },
        modes: { repulse: { distance: 250, duration: 0.5 } }
      },
      retina_detect: true
    });

    // Nach dem Init gleich Farben korrekt setzen
    updateParticles(document.body.classList.contains('dark-mode'));
  } catch (e) {
    console.warn('Particles init failed:', e);
  }
}

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

  // ==========================
  // Typewriter Section
  // ==========================
  const textElement = document.getElementById('typewriter-text')
  const phrases = [
    "Python & Kotlin",
    "Applied AI & MLOps Pragmatist",
    "Clean Code",
    "Fachinformatiker Anwendungsentwicklung",
    "Smart Automation",
    "Local LLMs"
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 80;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      textElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 50;
    } else {
      textElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      typeSpeed = 2000; // Pause am Ende der Phrase
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 500;
    }

    setTimeout(type, typeSpeed)
  }

  // Effekt start
  document.addEventListener('DOMContentLoaded', type)

  // ==========================================
  // BOOT-LOADER 
  // ==========================================
  const loader = document.getElementById('boot-loader');
  const dot = document.getElementById('global-status-dot');
  const pill = document.getElementById('availability-pill')

  // 1. BOOT-SEQUENZ & STATUS-WECHSEL
    window.addEventListener('load', () => {
      setTimeout(() => {
          const loader = document.getElementById('boot-loader');
          const dot = document.getElementById('global-status-dot');

          if (loader) {
              loader.style.opacity = '0';
              setTimeout(() => {
                  loader.remove();
                  if (dot) {
                      console.log("DEBUG: Schalte Status auf Grün!"); 
                      dot.classList.remove('status-red');
                      dot.classList.add('status-green');
                  }
              }, 800);
          }
      }, 1000);
  });

    // 2. SCROLL-LOGIK FÜR DIE PILL
    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            pill.classList.add('minimized');
        } else {
            pill.classList.remove('minimized');
        }
    });

