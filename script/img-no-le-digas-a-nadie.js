const images = [
    'docs/img/dont_tell10.png',
    'docs/img/dont_tell11.png',
    'docs/img/dont_tell12.png',
    'docs/img/dont_tell13.png',
    'docs/img/dont_tell14.png',
];
let currentIndex = 0;
function showPopup() {
    const popup = document.getElementById('popup');
    const overlay = document.getElementById('overlay');
    const popupImage = document.getElementById('popup-image');
    popupImage.src = images[currentIndex];
    popup.style.display = 'block';
    overlay.style.display = 'block';
    currentIndex = (currentIndex + 1) % images.length;
}
function hidePopup() {
    document.getElementById('popup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}
document.getElementById('popup-close').addEventListener('click', hidePopup);
document.getElementById('overlay').addEventListener('click', hidePopup);
setInterval(showPopup, 30000);