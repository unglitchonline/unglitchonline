const texts = [
    "unglitchonline",
    "si voy a crear un jardín imaginario, quiero que los sapos que vivan en él sean reales",
    "toda historia registrada presupone un futuro lector",
    "i miss my frinds that i pretend i dont need",
    "----------------",
    "Quiero saber cómo ayudar a construir relatos en marcha antes que historias cerradas",
    "dispositivos de refugio",
    "contextos históricos en que el conocimiento sobre los animales y la ecología se convierte en estrategias discursivas para constructos tecnológicos",
    "alfabetizados en el mundo digital-ahora estaban interconectados globalmente a través de una tubería de datos",
    "las fantasías en torno a la eternidad de lo tecnológico fueron confrontadas con la sencilla factibilidad de una lista creciente de lo efímero. Las máquinas sí pueden morir",
    "los medios son espacios de acción para construir ensayos al servicio de la combinación de lo separado",
    "tendencias hacia la estandarización"
];
let index = 0;
let charIndex = 0;
const typingText = document.getElementById('typing-text');

function type() {
    if (charIndex < texts[index].length) {
        typingText.textContent += texts[index].charAt(charIndex);
        charIndex++;
        setTimeout(type, 100); // Velocidad de la máquina de escribir
    } else {
        setTimeout(erase, 2000); // Espera antes de borrar
    }
}

function erase() {
    if (charIndex > 0) {
        typingText.textContent = texts[index].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, 50); // Velocidad de borrado
    } else {
        index = (index + 1) % texts.length;
        setTimeout(type, 500); // Espera antes de empezar a escribir el siguiente texto
    }
}

document.addEventListener('DOMContentLoaded', () => {
    type();
});