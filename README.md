# 🚀 Portfolio: Alexander Rothe

**Junior AI & Full Stack Developer** – mit Fokus auf lokale RAG-Systeme und Agentic Workflows, auf dem Weg zum AI Orchestrator.

Dieses Repository enthält den Quellcode meines Portfolios. Es zeigt meine Projekte, meinen Werdegang und im **AI Lab** mein aktuelles Kernprojekt **Project Mycelium**.

[🌐 Zur Live-Seite](https://alex83-r0ck.github.io)

---

## 🎯 Ansatz

**Komplexität reduzieren, Sicherheit maximieren.** Die Seite kommt ohne Framework und ohne Build-Schritt aus: reines HTML, CSS und JavaScript, schnell geladen und leicht zu warten.

* **Security by Design:** keine Cookies, kein Tracking, keine Analytics.
* **Conventional Commits:** eine nachvollziehbare, semantische Git-Historie.
* **Barrierefreiheit:** Skip-Link, Tastaturbedienung, Alt-Texte und Rücksicht auf `prefers-reduced-motion`.

---

## 🧭 Aufbau der Seite

| Seite | Inhalt |
| --- | --- |
| `index.html` | Startseite: Hero, Über mich (Bento-Raster mit Werdegang), Projekte, Nachweise und Kontakt |
| `lab.html` | AI Lab zu Project Mycelium: Live-Simulation einer Anfrage, interaktiver Regler zum Verfall von Wissen, Bausteine und Roadmap |
| `pages/impressum.html` | Impressum |
| `pages/datenschutzerklärung.html` | Datenschutzerklärung |

### Projekte auf der Seite

* **Project Mycelium** – lokales, bio-inspiriertes Langzeitgedächtnis für LLMs (Repository privat)
* **[Lead-Dojo](https://github.com/ALex83-r0ck/Lead-Dojo)** – Reasoning-Chains für lokale KI
* **[LernBuddy](https://github.com/ALex83-r0ck/Lernbuddy)** – Offline-first Lernplattform mit KI-Tutor
* **[DeerSecure](https://github.com/ALex83-r0ck/DeerSecure)** – hybride Sicherheitslösung für Windows
* **[Miet-Störungsprotokoll](https://github.com/ALex83-r0ck/MietStoerungsProtokoll)** – Beweissicherung für Mieter
* **[BewerbungsTollAnschreibenAI](https://github.com/ALex83-r0ck/BewerbungsTollAnschreibenAI)** – Anschreiben passend zur Stellenbeschreibung
* **[Bewerbungs-Automat](https://github.com/ALex83-r0ck/Bewerbungs-Automat)** – Konzept für ein semiautomatisches Bewerbungs-Tool
* **[BirthdaySchatz](https://github.com/ALex83-r0ck/BirthdaySchatz)**, **[VibeVault](https://github.com/ALex83-r0ck/Vibe-Vault)**, **[Pax-Mantis](https://github.com/ALex83-r0ck/Pax-Mantis)** – Android-Apps mit Kotlin & Compose
* **[Ozzy Osbourne Tribute](https://github.com/ALex83-r0ck/Tribute-to-Ozzy-Osbourne)** – interaktives Fan-Dashboard ([live](https://alex83-r0ck.github.io/Tribute-to-Ozzy-Osbourne/))

---

## 🛠 Tech Stack

* **HTML5, CSS3, Vanilla JavaScript (ES6+)** – kein Framework, kein Build-Schritt
* **Design-Tokens** über CSS Custom Properties für Hell- und Dunkelmodus
* **Schriften:** Geist & Geist Mono (Google Fonts)
* **Icons:** Bootstrap Icons
* **Kontaktformular:** Formspree
* **Hosting:** GitHub Pages

---

## ✨ Design & Interaktion

* **Moderner Look:** Aurora-Farbverläufe, schwebende Glas-Navigation, Bento-Raster und ein Tech-Laufband
* **Hell/Dunkel ohne Flackern:** Das Theme wird vor dem ersten Rendern gesetzt; ohne gespeicherte Wahl folgt die Seite dem Systemmodus
* **Porträtwechsel rein über CSS:** Im hellen Modus erscheint das Foto, im dunklen die Retro-Illustration
* **Spotlight-Effekt:** Ein Lichtkegel folgt dem Mauszeiger über die Karten (nur mit Maus)
* **Scroll-Animationen:** Inhalte blenden beim Scrollen ein
* **Easter Eggs:** Tippe `TRON` oder `MATRIX` 😉

---

## ⚡ Performance

* Bilder als **WebP** (Porträts in 640 px Breite statt mehrerer MB großer PNGs)
* Eigenes **Open-Graph-Bild** (`image/og-image.jpg`) für Link-Vorschauen
* **Cache-Busting** über Versionsnummern an CSS und JS (`?v=…`)
* Zertifikatsbilder werden **lazy** geladen

---

## 📁 Projektstruktur

```text
index.html              Startseite
lab.html                AI Lab – Project Mycelium
pages/                  Impressum und Datenschutzerklärung
css/main.css            Gemeinsames Stylesheet (Design-Tokens, Layout, Komponenten)
css/lab.css             Ergänzungen für das AI Lab
js/main.js              Theme, Navigation, Spotlight, Scroll-Effekte, Easter Eggs
js/lab.js               Simulation und Decay-Regler im AI Lab
image/                  Porträts, Zertifikate und Open-Graph-Bild (WebP/JPG)
assets/docs/            Zeugnisse und Zertifikate als PDF
```

---

## 🚀 Lokal starten

1. Repository klonen:

   ```bash
   git clone https://github.com/ALex83-r0ck/ALex83-r0ck.github.io.git
   cd ALex83-r0ck.github.io
   ```

2. Lokalen Server starten:

   ```bash
   python -m http.server 8000
   ```

3. Im Browser öffnen: <http://localhost:8000>

---

## 📬 Kontakt & Netzwerk

* LinkedIn: [Alexander Rothe](https://www.linkedin.com/in/alexander-rothe-84ab112b6)
* GitHub: [ALex83-r0ck](https://github.com/ALex83-r0ck)
* E-Mail: <rothe_alexander@t-online.de>

> „Probleme sind Gelegenheiten in Arbeitskleidung. Ich baue die passenden Werkzeuge dafür.“
