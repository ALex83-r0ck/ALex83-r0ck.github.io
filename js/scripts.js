document.addEventListener('DOMContentLoaded', () => {
  // ===========================
  // THEME TOGGLE + PROFILE IMAGE
  // ===========================
  const themeToggle = document.getElementById('theme-toggle');
  const profilePic = document.getElementById('profile-pic');

  const applyTheme = (dark) => {
    document.body.classList.toggle('dark-mode', dark);
    if (themeToggle) themeToggle.textContent = dark ? '☀️' : '🌙';
    localStorage.setItem('darkMode', dark ? '1' : '0');

    if (profilePic) {
      const newSrc = dark ? 'image/overlay.png' : 'image/1000057922.png';
      profilePic.src = newSrc;
    }
  };

  applyTheme(localStorage.getItem('darkMode') === '1');

  themeToggle?.addEventListener('click', () => {
    const dark = !document.body.classList.contains('dark-mode');
    applyTheme(dark);
    if (typeof updateParticles === 'function') updateParticles(dark);
  });

  // ===========================
  // BANNER MANAGER V3 + GLITCH
  // ===========================
  const pill = document.getElementById('availability-pill');
  if (pill) {
    // Einmaliger Glitch-Effekt beim Laden
    pill.classList.add('glitch-effect');
    setTimeout(() => pill.classList.remove('glitch-effect'), 500);

    window.addEventListener('scroll', () => {
      if (window.scrollY > 150) {
        pill.classList.add('floating');
      } else {
        pill.classList.remove('floating');
      }
    });
  }

  // Globaler Scroll-Handler
  window.scrollToContact = () => {
    const contact = document.getElementById('contact');
    contact?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // ===========================
  // BACK TO TOP BUTTON
  // ===========================
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.style.display = window.pageYOffset > 200 ? 'block' : 'none';
    });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ===========================
  // SCROLL REVEAL PROJECTS
  // ===========================
  const cards = document.querySelectorAll('#projects .card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('fade-in');
    });
  }, { threshold: 0.15 });
  cards.forEach(card => observer.observe(card));

  // ==========================
  // TYPEWRITER INITIATION
  // ==========================
  type(); // Starte den Typewriter innerhalb des Main-Loaders
});

// ===========================
// PARTICLES LOGIC
// ===========================
const updateParticles = (dark) => {
  const color = dark ? '#ff9800' : '#054def'; 
  if (window.pJSDom && window.pJSDom.length) {
    const pJS = window.pJSDom[0].pJS;
    pJS.particles.color.value = color;
    pJS.particles.line_linked.color = color;
    pJS.fn.particlesRefresh(); 
  }
};

// ==========================
// TYPEWRITER ENGINE
// ==========================
const phrases = [
  "Junior Software Developer",
  "Applied AI & MLOps Pragmatist",
  "Clean Code Advocate",
  "15 Years Industry Experience"
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 80;

function type() {
  const textElement = document.getElementById('typewriter-text');
  if (!textElement) return;

  const currentPhrase = phrases[phraseIndex];

  if (isDeleting) {
    textElement.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
    typeSpeed = 40;
  } else {
    textElement.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
    typeSpeed = 80;
  }

  if (!isDeleting && charIndex === currentPhrase.length) {
    isDeleting = true;
    typeSpeed = 2000; // Lange Pause beim fertigen Wort
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typeSpeed = 500;
  }

  setTimeout(type, typeSpeed);
}

// ==========================================
// RECRUITER EASTER EGG (Console)
// ==========================================
console.log(
  `%c ⚡ SYSTEM STATUS: Alexander Rothe - Portfolio v2.1 %c`,
  "background: #007bff; color: #fff; font-weight: bold; padding: 4px; border-radius: 4px 0 0 4px;",
  "background: #ff9800; color: #000; font-weight: bold; padding: 4px; border-radius: 0 4px 4px 0;"
);

console.log(
  "%cBrauchen Sie Verstärkung? %c\nIch bin bereit für neue Herausforderungen im Bereich Python, App-Dev oder KI-Integration.",
  "color: #007bff; font-size: 1.2rem; font-weight: bold;",
  "color: inherit; font-size: 1rem;"
);

console.log(
  "%cTipp:%c Schauen Sie sich meine 'Lead-Dojo' Commit-Historie an – ich liebe saubere Git-Workflows!",
  "font-style: italic; color: #28a745;",
  "font-style: normal;"
);