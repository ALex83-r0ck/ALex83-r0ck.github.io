document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Verhindert das Standardverhalten des Formulars

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Eingabevalidierung
    if (!name || !email || !message) {
        alert('Bitte fülle Sie alle Felder aus.');
        return;
    }

    if (!validateEmail(email)) {
        alert('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
        return;
    }

    alert(`Danke für Ihre Nachricht, ${name}! Ich werde mich bald bei Ihnen melden.`);

    // Beispiel für das Senden der Daten an einen Server
    // fetch('/your-server-endpoint', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ name, email, message }),
    // })
    // .then(response => {
    //     if (response.ok) {
    //         alert('Nachricht erfolgreich gesendet!');
    //         this.reset(); // Formular zurücksetzen
    //     } else {
    //         alert('Fehler beim Senden der Nachricht. Bitte versuche es später erneut.');
    //     }
    // })
    // .catch(error => {
    //     alert('Es gab ein Problem mit der Anfrage. Bitte versuche es später erneut.');
    // });

    // Formular zurücksetzen
    this.reset();
});

// E-Mail-Validierungsfunktion
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Scroll-Animationen
document.querySelectorAll('.toggle-details').forEach(button => {
    button.addEventListener('click', () => {
        const content = button.nextElementSibling;
        const isActive = content.style.maxHeight;

        if (isActive) {
            content.style.maxHeight = null;
            content.style.opacity = 0;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
            content.style.opacity = 1;
        }
    });
});

document.getElementById('image-overlay').addEventListener('click', function() {
    const overlayImage = document.getElementById('overlay-image');
    const profileImage = document.getElementById('profile-image');
    const profileDescription = document.getElementById('profile-description');
    const overlay = document.getElementById('image-overlay');

    // Beim ersten Klick das Overlay und Overlay-Bild ausblenden, Profilbild und Text anzeigen
    overlay.style.display = 'none'; 
    overlayImage.style.display = 'none'; 
    profileImage.style.display = 'block'; 
    profileDescription.style.display = 'block'; 
});

// Profilbild klickbar machen, um Overlay und Text auszublenden
document.getElementById('profile-image').addEventListener('click', function() {
    const overlayImage = document.getElementById('overlay-image');
    const profileImage = document.getElementById('profile-image');
    const profileDescription = document.getElementById('profile-description');
    const overlay = document.getElementById('image-overlay');

    // Overlay und Overlay-Bild anzeigen, Profilbild und Text ausblenden
    overlay.style.display = 'flex';
    overlayImage.style.display = 'block';
    profileImage.style.display = 'none';
    profileDescription.style.display = 'none';
});
