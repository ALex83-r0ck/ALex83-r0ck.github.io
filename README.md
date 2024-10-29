# Praktika-Portfolio

Dies ist die Portfolio-Website von Alexander Rothe, die seine Projekte, Zertifikate und seinen Lebenslauf zeigt. Dieses Projekt wurde mit Flask als Backend und HTML/CSS/JavaScript als Frontend entwickelt und wird auf GitHub Pages und Heroku gehostet.

## Inhaltsverzeichnis

- [Über das Projekt](#über-das-projekt)
- [Verwendete Technologien](#verwendete-technologien)
- [Installation](#installation)
- [Verwendung](#verwendung)
- [Deployment](#deployment)
- [Kontakt](#kontakt)

## Über das Projekt

Diese Website dient dazu, meine Fähigkeiten und Erfahrungen als Fachinformatiker für Anwendungsentwicklung vorzustellen. Sie enthält Informationen über meine bisherigen Projekte, Zertifikate und meinen Lebenslauf.

## Verwendete Technologien

- Flask
- HTML
- CSS
- JavaScript
- Heroku
- GitHub Pages

## Installation

1. Klone das Repository:

    ```bash
    git clone https://github.com/ALEX83-R0CK/ALEX83-R0CK.GITHUB.IO.git
    ```

2. Navigiere in das Verzeichnis:

    ```bash
    cd ALEX83-R0CK.GITHUB.IO/backend
    ```

3. Erstelle und aktiviere eine virtuelle Umgebung:

    ```bash
    python -m venv venv
    source venv/bin/activate  # für Windows: venv\Scripts\activate
    ```

4. Installiere die Abhängigkeiten:

    ```bash
    pip install -r requirements.txt
    ```

## Verwendung

1. Starte die Flask-Anwendung:

    ```bash
    python run.py
    ```

2. Öffne deinen Browser und gehe zu `http://localhost:5000`, um die Website zu sehen.

## Deployment

### GitHub Pages

1. Stelle sicher, dass alle statischen Dateien in deinem GitHub-Repository vorhanden sind.
2. Gehe zu den Einstellungen deines Repositories und aktiviere GitHub Pages.

### Heroku

1. Melde dich bei Heroku an und erstelle eine neue App.
2. Füge das Remote-Repository zu deinem Projekt hinzu:

    ```bash
    heroku git:remote -a dein-heroku-app-name
    ```

3. Pushe dein Projekt zu Heroku:

    ```bash
    git push heroku master
    ```

## Kontakt

Bei Fragen oder Anmerkungen kannst du mich unter folgender E-Mail-Adresse erreichen:
`rothe_alexander@t-online.de`

Viel Spaß und vielen Dank für das Interesse an meinem Projekt!
