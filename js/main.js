/**
 * Alexander Rothe – Portfolio
 * Theme-Umschaltung, mobile Navigation, Scroll-Effekte und Easter Eggs.
 * Wird von Startseite, AI Lab und Legal-Seiten genutzt.
 */
(function () {
    'use strict';

    const root = document.documentElement;
    root.classList.add('js');

    // ===========================
    // THEME
    // ===========================
    // Das Theme wird schon im <head> gesetzt; hier nur noch der Umschalter.
    const themeToggle = document.getElementById('theme-toggle');
    const themeColor = document.querySelector('meta[name="theme-color"]');

    const applyTheme = (isDark) => {
        root.setAttribute('data-theme', isDark ? 'dark' : 'light');
        if (themeColor) themeColor.setAttribute('content', isDark ? '#0b1020' : '#f6f7fb');
        try { localStorage.setItem('darkMode', isDark ? '1' : '0'); } catch (e) { /* Private Mode */ }
    };

    themeToggle?.addEventListener('click', () => {
        applyTheme(root.getAttribute('data-theme') !== 'dark');
    });

    // ===========================
    // MOBILE NAVIGATION
    // ===========================
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');

    const setNavOpen = (open) => {
        if (!navToggle || !navLinks) return;
        navLinks.classList.toggle('open', open);
        navToggle.setAttribute('aria-expanded', String(open));
        navToggle.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
        navToggle.querySelector('i')?.classList.replace(open ? 'bi-list' : 'bi-x-lg', open ? 'bi-x-lg' : 'bi-list');
    };

    navToggle?.addEventListener('click', () => setNavOpen(!navLinks.classList.contains('open')));
    navLinks?.addEventListener('click', (e) => { if (e.target.closest('a')) setNavOpen(false); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setNavOpen(false); });

    // ===========================
    // SCROLL-TOP BUTTON
    // ===========================
    const scrollTop = document.getElementById('scroll-top');
    if (scrollTop) {
        const onScroll = () => scrollTop.classList.toggle('visible', window.scrollY > 600);
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        scrollTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    // ===========================
    // REVEAL ON SCROLL & AKTIVER NAV-LINK
    // ===========================
    const revealEls = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
        revealEls.forEach((el) => revealObserver.observe(el));

        const sectionLinks = new Map();
        document.querySelectorAll('.nav-links a[href^="#"]').forEach((a) => {
            const section = document.querySelector(a.getAttribute('href'));
            if (section) sectionLinks.set(section, a);
        });
        const navObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                sectionLinks.forEach((a) => a.classList.remove('active'));
                sectionLinks.get(entry.target)?.classList.add('active');
            });
        }, { rootMargin: '-45% 0px -50% 0px' });
        sectionLinks.forEach((_, section) => navObserver.observe(section));
    } else {
        revealEls.forEach((el) => el.classList.add('in-view'));
    }

    // ===========================
    // KEYBOARD EASTER EGGS
    // ===========================
    // Nur auf Seiten im Wurzelverzeichnis, die das per data-easter-eggs erlauben:
    // Die Legal-Seiten haben eigene Animationen, und die relativen
    // Weiterleitungen würden dort ins Leere führen.
    const eggsEnabled = document.body.hasAttribute('data-easter-eggs');
    let keyBuffer = '';
    document.addEventListener('keydown', (e) => {
        if (!eggsEnabled || e.key.length !== 1) return;
        // Wer "Elektronik" ins Kontaktformular tippt, soll nicht weitergeleitet werden.
        if (e.target.closest('input, textarea, select, [contenteditable="true"]')) return;
        keyBuffer = (keyBuffer + e.key.toUpperCase()).slice(-10);

        if (keyBuffer.endsWith('MATRIX')) {
            window.location.href = 'pages/datenschutzerklärung.html';
        } else if (keyBuffer.endsWith('TRON')) {
            window.location.href = 'pages/impressum.html';
        }
    });
})();
