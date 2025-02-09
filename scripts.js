// ==================== //
// Scroll-Animationen   //
// ==================== //
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

// ==================== //
// Overlay-Management   //
// ==================== //
document.addEventListener('DOMContentLoaded', function() {
    const overlayImage = document.getElementById('overlay-image');
    const profileImage = document.getElementById('profile-image');
    const profileDescription = document.getElementById('profile-description');
    const imageContainer = document.getElementById('image-container');

    if (overlayImage && profileImage && profileDescription && imageContainer) {
        // Beim Klick auf das Overlay-Bild
        overlayImage.addEventListener('click', () => {
            overlayImage.style.display = 'none';
            profileImage.style.display = 'block';
            profileDescription.style.display = 'block';
        });

        // Beim Klick auf das Profilbild (optional - zum Zurückschalten)
        profileImage.addEventListener('click', () => {
            overlayImage.style.display = 'block';
            profileImage.style.display = 'none';
            profileDescription.style.display = 'none';
        });
    } else {
        console.error('Ein oder mehrere erforderliche Elemente wurden nicht gefunden');
    }
});

// Rest des existierenden JavaScript-Codes bleibt unverändert...

// ==================== //
// Würfel-Animation     //
// ==================== //
let angle = 0;

document.getElementById("left-btn").addEventListener("click", () => {
    angle -= 90;
    document.getElementById("cube").style.transform = `rotateY(${angle}deg)`;
});

document.getElementById("right-btn").addEventListener("click", () => {
    angle += 90;
    document.getElementById("cube").style.transform = `rotateY(${angle}deg)`;
});

// ==================== //
// Lightbox-Management  //
// ==================== //
document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const closeLightbox = document.getElementById('close-lightbox');

    // Lightbox für Bilder einrichten
    function setupLightbox(images) {
        images.forEach(image => {
            image.addEventListener('click', () => {
                lightboxImage.src = image.src;
                lightbox.style.display = 'flex';
            });
        });
    }

    // Lightbox für Würfel-Bilder
    const cubeImages = document.querySelectorAll('.face-image');
    setupLightbox(cubeImages);

    // Lightbox für Zertifikats-Bilder
    const certificateImages = document.querySelectorAll('.certificate-image');
    setupLightbox(certificateImages);

    // Lightbox schließen
    closeLightbox.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });
});