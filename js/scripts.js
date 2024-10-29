document.getElementById('contact-form').addEventListener('submit', function(event) {
    // Prevent default behavior (this will be handled later)
    // event.preventDefault(); 

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

    // Um das Formular zu senden
    this.submit(); // Dies sendet das Formular

    alert(`Danke für Ihre Nachricht, ${name}! Ich werde mich bald bei Ihnen melden.`);

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

// Overlay-Management
document.getElementById('image-overlay').addEventListener('click', function() {
    const overlayImage = document.getElementById('overlay-image');
    const profileImage = document.getElementById('profile-image');
    const profileDescription = document.getElementById('profile-description');
    const overlay = document.getElementById('image-overlay');

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

    overlay.style.display = 'flex';
    overlayImage.style.display = 'block';
    profileImage.style.display = 'none';
    profileDescription.style.display = 'none';
});
