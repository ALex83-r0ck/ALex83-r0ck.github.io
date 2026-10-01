/**
 * AI Lab – Project Mycelium
 * Simulation einer Anfrage und Decay-Regler.
 */
(function () {
    'use strict';

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const wait = (ms) => new Promise((resolve) => setTimeout(resolve, reducedMotion ? 0 : ms));

    // ===========================
    // SIMULATION: EINE FRAGE DURCHS GEWEBE
    // ===========================
    const output = document.getElementById('protocol-output');
    const replayBtn = document.getElementById('replay-sim');
    const pipeline = document.querySelector('.pipeline');
    const stages = pipeline ? [...pipeline.querySelectorAll('.stage')] : [];
    const toast = document.getElementById('sim-toast');

    // Jede Zeile: Text, CSS-Klasse und optional die Stufe, die dabei aufleuchtet.
    // "skip" markiert Stufen, die eine freie Frage überspringt.
    const script = [
        { q: 'Wie funktionieren Klassen in Python?' },
        { stage: 'weiche', cls: 'log-step', text: '[weiche] Thema: python → Wissen' },
        { stage: 'suche', cls: 'log-step', text: '[suche] 3 Treffer in 42 ms' },
        { stage: 'lernen', cls: 'log-step', text: '[lernen] 3 Knoten gestärkt, 1 neuer Faden' },
        { stage: 'antwort', cls: 'log-answer', type: true,
          text: 'Eine Klasse bündelt Daten und Methoden zu einem eigenen Typ; __init__ setzt den Startzustand (python_grundlagen.pdf).' },
        { stage: 'validator', cls: 'log-ok', text: '[prüfung] 2 / 2 Sätze belegt ✓', toast: true },
        { cls: 'log-sep', text: '──────────────────────────────' },
        { q: 'Haben Pinguine Knie?', reset: true },
        { stage: 'weiche', cls: 'log-warn', text: '[weiche] kein Bezug zum Wissen → freie Frage', skip: ['suche', 'lernen', 'validator'] },
        { stage: 'antwort', cls: 'log-answer', type: true, text: 'Ja – gut versteckt unter Federn und Körperfett.' },
        { cls: 'log-ok', text: '[gewebe] unverändert' }
    ];

    let runId = 0;

    const addLine = (cls, text) => {
        const line = document.createElement('div');
        line.className = 'log-line ' + cls;
        line.textContent = text;
        output.appendChild(line);
        return line;
    };

    const setStage = (name, skip) => {
        if (!pipeline) return;
        stages.forEach((el) => {
            if (el.classList.contains('is-active')) {
                el.classList.remove('is-active');
                el.classList.add('is-done');
            }
            if (el.dataset.stage === name) {
                el.classList.remove('is-done');
                el.classList.add('is-active');
            }
            if (skip && skip.includes(el.dataset.stage)) el.classList.add('is-skip');
        });
        if (skip) pipeline.classList.add('is-skipped');
    };

    const resetStages = () => {
        if (!pipeline) return;
        pipeline.classList.remove('is-skipped');
        stages.forEach((el) => el.classList.remove('is-active', 'is-done', 'is-skip'));
    };

    const showToast = () => {
        if (!toast) return;
        toast.hidden = false;
        setTimeout(() => { toast.hidden = true; }, 3500);
    };

    async function typeInto(el, text, id) {
        if (reducedMotion) { el.textContent = text; return; }
        const cursor = document.createElement('span');
        cursor.className = 'log-cursor';
        el.textContent = '';
        el.appendChild(cursor);
        // Wortweise wie im Reflex-Modus
        const words = text.split(' ');
        for (let i = 0; i < words.length; i++) {
            if (id !== runId) return;
            cursor.before((i ? ' ' : '') + words[i]);
            await wait(55);
        }
        cursor.remove();
    }

    async function runSimulation() {
        if (!output) return;
        const id = ++runId;
        output.textContent = '';
        replayBtn && (replayBtn.disabled = true);
        resetStages();
        pipeline?.classList.add('is-running');

        for (const step of script) {
            if (id !== runId) return;
            if (step.q) {
                if (step.reset) { await wait(900); resetStages(); }
                addLine('log-q', step.q);
                await wait(700);
                continue;
            }
            if (step.stage) setStage(step.stage, step.skip);
            const line = addLine(step.cls, step.type ? '' : step.text);
            if (step.type) await typeInto(line, step.text, id);
            if (step.toast) showToast();
            await wait(step.cls === 'log-tag' ? 250 : 750);
        }

        // Am Ende wieder alle Stufen normal zeigen
        await wait(1200);
        if (id !== runId) return;
        resetStages();
        pipeline?.classList.remove('is-running');
        if (replayBtn) replayBtn.disabled = false;
    }

    if (output) {
        replayBtn?.addEventListener('click', runSimulation);
        if ('IntersectionObserver' in window) {
            const io = new IntersectionObserver((entries) => {
                if (entries.some((e) => e.isIntersecting)) {
                    io.disconnect();
                    runSimulation();
                }
            }, { threshold: 0.35 });
            io.observe(output);
        } else {
            runSimulation();
        }
    }

    // ===========================
    // DECAY-REGLER
    // ===========================
    // Standardwerte aus Mycelium: DECAY_RATE 0,01 pro Tag, Stufen bei 0,5 / 0,25 / 0,15, veraltet ab 0,1.
    const range = document.getElementById('decay-days');
    if (range) {
        const out = document.getElementById('decay-days-out');
        const weightEl = document.getElementById('decay-weight');
        const fill = document.getElementById('decay-bar-fill');
        const stageEls = [...document.querySelectorAll('#decay-stages li')];

        const stageIndex = (w) => {
            if (w <= 0.1) return 4;
            if (w <= 0.15) return 3;
            if (w <= 0.25) return 2;
            if (w <= 0.5) return 1;
            return 0;
        };

        const update = () => {
            const days = Number(range.value);
            const weight = Math.max(0, Math.round((1 - 0.01 * days) * 100) / 100);
            out.textContent = days;
            weightEl.textContent = weight.toFixed(2).replace('.', ',');
            fill.style.width = (weight * 100) + '%';
            const current = stageIndex(weight);
            stageEls.forEach((el, i) => el.classList.toggle('is-current', i === current));
        };

        range.addEventListener('input', update);
        update();
    }
})();
