/**
 * Alexander Rothe - Portfolio Scripts
 * Refactored & Enhanced with "Wow" features.
 */

document.addEventListener('DOMContentLoaded', () => {
    // ===========================
    // CORE ELEMENTS
    // ===========================
    const elements = {
        themeToggle: document.getElementById('theme-toggle'),
        profilePic: document.getElementById('profile-pic'),
        contactForm: document.getElementById('contact-form'),
        nameInput: document.getElementById('name'),
        pill: document.getElementById('availability-pill'),
        statusDot: document.getElementById('global-status-dot'),
        scanOverlay: document.getElementById('scan-overlay'),
        statusWindow: document.getElementById('project-status-window'),
        closeStatusBtn: document.getElementById('close-status-btn'),
        typewriterText: document.getElementById('typewriter-text'),
        navLinks: document.querySelectorAll('.nav-link'),
        projects: document.querySelectorAll('#projects .card'),
        commandPalette: document.getElementById('command-palette'),
        cmdInput: document.querySelector('.cmd-input'),
        aiTerminal: document.getElementById('ai-terminal-content')
    };

    // ===========================
    // THEME MANAGEMENT (With Glitch)
    // ===========================
    const applyTheme = (isDark, withGlitch = false) => {
        if (withGlitch) {
            document.body.classList.add('glitch-reboot');
            setTimeout(() => document.body.classList.remove('glitch-reboot'), 500);
        }

        document.body.classList.toggle('dark-mode', isDark);
        if (elements.themeToggle) elements.themeToggle.textContent = isDark ? '☀️' : '🌙';
        localStorage.setItem('darkMode', isDark ? '1' : '0');

        if (elements.profilePic) {
            elements.profilePic.src = isDark ? 'image/overlay.png' : 'image/1000057922.png';
        }
        
        updateParticles(isDark);
    };

    // Initialize Theme
    const savedTheme = localStorage.getItem('darkMode') === '1';
    applyTheme(savedTheme);

    elements.themeToggle?.addEventListener('click', () => {
        const isDark = !document.body.classList.contains('dark-mode');
        applyTheme(isDark, true);
    });

    // ===========================
    // 3D TILT EFFECT
    // ===========================
    const initTilt = () => {
        elements.projects.forEach(card => {
            card.classList.add('tilt-card');
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            });
        });
    };
    initTilt();

    // ===========================
    // COMMAND PALETTE (Alt + K)
    // ===========================
    window.addEventListener('keydown', (e) => {
        if (e.altKey && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            elements.commandPalette.classList.toggle('active');
            if (elements.commandPalette.classList.contains('active')) {
                elements.cmdInput.focus();
            }
        }
        if (e.key === 'Escape') {
            elements.commandPalette.classList.remove('active');
        }
    });

    elements.cmdInput?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const cmd = elements.cmdInput.value.toLowerCase().trim();
            executeCommand(cmd);
            elements.cmdInput.value = '';
            elements.commandPalette.classList.remove('active');
        }
    });

    function executeCommand(cmd) {
        const routes = {
            'projekte': '#projects',
            'experience': '#experience-hub',
            'kontakt': '#contact',
            'lebenslauf': '#lebenslauf',
            'fokus': '#focus'
        };

        if (routes[cmd]) {
            document.querySelector(routes[cmd])?.scrollIntoView({ behavior: 'smooth' });
        } else if (cmd === 'matrix') {
            if (typeof activateMatrix === 'function') activateMatrix();
            else alert('Matrix-Modus nur auf Legal-Pages verfügbar (noch!)');
        } else if (cmd === 'reboot') {
            applyTheme(!document.body.classList.contains('dark-mode'), true);
        } else {
            alert(`Befehl "${cmd}" nicht erkannt. Versuche: projekte, kontakt, matrix, reboot.`);
        }
    }

    // ===========================
    // AI TERMINAL SIMULATION
    // ===========================
    const aiResponses = {
        focus: "Mein Fokus liegt auf der Synergie zwischen Industrie-Know-how und modernster KI. Ich baue keine Spielzeuge, sondern Werkzeuge für echte Effizienz.",
        experience: "15 Jahre in Logistik & Produktion haben mir eins gelehrt: Ein System ist nur so gut wie der Prozess, den es unterstützt. Ich verstehe die 'reale Welt' hinter dem Code.",
        vision: "Software, die mitdenkt. Mein Ziel ist die nahtlose Integration von lokalen, datenschutzkonformen LLMs in alltägliche Business-Workflows.",
        doc_umschulung: "Diese Bescheinigung markiert den Startpunkt meiner IT-Karriere (2023). Sie belegt die fundierte theoretische Basis in der Anwendungsentwicklung.",
        doc_zeugnis_gfn: "Mein Abschlusszeugnis der Umschulung. Es spiegelt die intensive Auseinandersetzung mit Java, SQL und moderner Softwarearchitektur wider.",
        doc_praktikum: "Mein Praktikum im Systemhaus war der Realitätscheck. Fokus: Remote-Work, Kundenprojekte und Webstack-Herausforderungen in einem professionellen Umfeld.",
        doc_datascience: "Mein aktuellstes Zertifikat (2026). Hier habe ich meine Skills in Python für Datenanalyse und Machine Learning vertieft, um RAG-Systeme noch präziser zu bauen."
    };

    window.runAIShowcase = (topic) => {
        const modal = document.getElementById('ai-modal');
        const modalBody = document.getElementById('ai-modal-body');
        if (!modal || !modalBody) return;

        const text = aiResponses[topic] || "Keine Daten zu diesem Thema gefunden.";
        
        // Open Modal
        modal.classList.add('active');
        modalBody.innerHTML = `<p>> Abfrage: ${topic.toUpperCase()}...</p><p id="ai-modal-typing"></p>`;
        
        // Typing Effect
        let i = 0;
        const typingElement = document.getElementById('ai-modal-typing');
        function type() {
            if (i < text.length) {
                typingElement.textContent += text.charAt(i);
                i++;
                setTimeout(type, 25);
            } else {
                typingElement.innerHTML += '<span class="ai-cursor"></span>';
            }
        }
        setTimeout(type, 500);
    };

    window.closeAIModal = () => {
        const modal = document.getElementById('ai-modal');
        if (modal) modal.classList.remove('active');
    };

    // Close modal on outside click
    window.addEventListener('click', (e) => {
        const modal = document.getElementById('ai-modal');
        if (e.target === modal) closeAIModal();
    });

    // ===========================
    // TYPEWRITER EFFECT (Header)
    // ===========================
    const phrases = ["Python & Kotlin", "Applied AI & MLOps Pragmatist", "Clean Code", "Smart Automation", "Local LLMs"];
    let phraseIndex = 0; let charIndex = 0; let isDeleting = false; let typeSpeed = 100;

    function typewriterEffect() {
        if (!elements.typewriterText) return;
        const currentPhrase = phrases[phraseIndex];
        if (isDeleting) {
            elements.typewriterText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--; typeSpeed = 50;
        } else {
            elements.typewriterText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++; typeSpeed = 100;
        }
        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true; typeSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false; phraseIndex = (phraseIndex + 1) % phrases.length; typeSpeed = 500;
        }
        setTimeout(typewriterEffect, typeSpeed);
    }
    if (elements.typewriterText) typewriterEffect();

    // ===========================
    // PARTICLES (OPTIMIZED)
    // ===========================
    function updateParticles(isDark) {
        if (window.innerWidth < 768 || !window.pJSDom || !window.pJSDom.length) return;
        const color = isDark ? '#f59e0b' : '#3b82f6';
        const pJS = window.pJSDom[0].pJS;
        if (pJS && pJS.particles) {
            pJS.particles.color.value = color;
            pJS.particles.line_linked.color = color;
            pJS.fn.particlesRefresh();
        }
    }

    if (window.particlesJS && window.innerWidth >= 768) {
        try {
            particlesJS('particles-js', {
                particles: {
                    number: { value: 15, density: { enable: true, value_area: 800 } },
                    color: { value: savedTheme ? '#f59e0b' : '#3b82f6' },
                    shape: { type: 'circle' },
                    opacity: { value: 0.3, random: true },
                    size: { value: 10, random: true },
                    line_linked: { enable: true, distance: 150, color: '#3b82f6', opacity: 0.1, width: 1 },
                    move: { enable: true, speed: 1.2, out_mode: 'out' }
                },
                interactivity: {
                    events: { onhover: { enable: true, mode: 'repulse' } },
                    modes: { repulse: { distance: 100 } }
                },
                retina_detect: true
            });
        } catch (e) {}
    }

    // ===========================
    // SCAN EFFECT & STATUS WINDOW
    // ===========================
    const runScanEffect = () => {
        if (!elements.scanOverlay || !elements.statusWindow) {
            updateStatusDot();
            return;
        }

        elements.scanOverlay.style.display = 'block';
        const scanLine = elements.scanOverlay.querySelector('.scan-line');
        
        // Run scan animation twice
        scanLine.style.animation = 'scan-animation 1.5s linear 2';
        
        scanLine.addEventListener('animationend', () => {
            elements.scanOverlay.style.transition = 'opacity 0.5s ease';
            elements.scanOverlay.style.opacity = '0';
            setTimeout(() => {
                elements.scanOverlay.style.display = 'none';
                elements.statusWindow.classList.remove('hidden');
            }, 500);
        });
    };

    elements.closeStatusBtn?.addEventListener('click', () => {
        elements.statusWindow.classList.add('hidden');
        sessionStorage.setItem('scanShown', 'true');
        updateStatusDot();
        // Optional: Trigger specific entrance animations
    });

    const scanShown = sessionStorage.getItem('scanShown');
    if (!scanShown) {
        window.addEventListener('load', () => {
            setTimeout(runScanEffect, 500);
        });
    } else {
        if (elements.scanOverlay) elements.scanOverlay.style.display = 'none';
        if (elements.statusWindow) elements.statusWindow.classList.add('hidden');
        updateStatusDot();
    }

    function updateStatusDot() {
        if (elements.statusDot) {
            elements.statusDot.classList.remove('status-red');
            elements.statusDot.classList.add('status-green');
        }
    }

    // ===========================
    // TERMINAL QUOTE TYPEWRITER
    // ===========================
    const terminalQuoteText = document.getElementById('terminal-quote-text');
    const terminalContainer = document.querySelector('.terminal-quote');
    const quote = '"On the other side of the screen, it all looks so easy." - Kevin Flynn (Tron, 1982)';
    let quoteIndex = 0;
    let quoteStarted = false;

    function typeQuote() {
        if (quoteIndex < quote.length) {
            terminalQuoteText.textContent += quote.charAt(quoteIndex);
            quoteIndex++;
            setTimeout(typeQuote, 50);
        } else {
            // Show hint after typing finishes
            const terminalHint = document.getElementById('terminal-hint');
            if (terminalHint) {
                terminalHint.style.transition = 'opacity 2s ease';
                terminalHint.style.opacity = '0.5';
            }
        }
    }

    const quoteObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !quoteStarted) {
                quoteStarted = true;
                setTimeout(typeQuote, 500);
            }
        });
    }, { threshold: 0.1 });

    if (terminalContainer) quoteObserver.observe(terminalContainer);

    // ===========================
    // KEYBOARD EASTER EGGS
    // ===========================
    let keyBuffer = '';
    document.addEventListener('keydown', (e) => {
        keyBuffer += e.key.toUpperCase();
        if (keyBuffer.length > 10) keyBuffer = keyBuffer.substring(keyBuffer.length - 10);
        
        if (keyBuffer.includes('MATRIX')) {
            window.location.href = 'pages/datenschutzerklärung.html';
            keyBuffer = '';
        }
        if (keyBuffer.includes('TRON')) {
            window.location.href = 'pages/impressum.html';
            keyBuffer = '';
        }
    });

    // ===========================
    // DYNAMIC STATUS DOT
    // ===========================
    function updateStatusDot() {
        if (elements.statusDot) {
            elements.statusDot.classList.remove('status-red');
            elements.statusDot.classList.add('status-green');
        }
    }
});
