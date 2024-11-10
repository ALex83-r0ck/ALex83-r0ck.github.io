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

document.addEventListener('DOMContentLoaded', function() {
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
});

let angle = 0;

document.getElementById("left-btn").addEventListener("click", () => {
    angle -= 90;
    document.getElementById("cube").style.transform = `rotateY(${angle}deg)`;
});

document.getElementById("right-btn").addEventListener("click", () => {
    angle += 90;
    document.getElementById("cube").style.transform = `rotateY(${angle}deg)`;
});