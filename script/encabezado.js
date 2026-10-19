const title = "unglitchonline";
const texts = [
    "si voy a crear un jardín imaginario, quiero que los sapos que vivan en él sean reales",
    "toda historia registrada presupone un futuro lector",
    "i miss my frinds that i pretend i dont need",
    "----------------",
    "quiero saber cómo ayudar a construir relatos en marcha antes que historias cerradas",
    "dispositivos de refugio",
    "contextos históricos en que el conocimiento sobre los animales y la ecología se convierte en estrategias discursivas para constructos tecnológicos",
    "alfabetizados en el mundo digital ahora estaban interconectados globalmente a través de una tubería de datos",
    "las fantasías en torno a la eternidad de lo tecnológico fueron confrontadas con la sencilla factibilidad de una lista creciente de lo efímero. las máquinas sí pueden morir.",
    "los medios son espacios de acción para construir ensayos al servicio de la combinación de lo separado",
    "tendencias hacia la estandarización",
    "internet del bosque = el micelio",
    "las oportunidades naturales de las comunicaciones descentralizadas",
    "el corrido como instrumento de memoria colectiva",
    "los corridos son nuestros padres y nuestras abuelas",
    "you’re fair and i’m insane",
    "i’m not gonna be you bitter rival",
    "las nuevas marchas del cuerpo dolido dicen I dont know where you are",
    "tengo sueños en los que mis manos son palas",
    "pienso en los mapas obsoletos que nunca vieron las nuevas carreteras ni las nuevas glorietas",
    "no necesariamente escribir cartas, sino tener a quién entregarlas",
    "las minorías a veces representan el 52% de la población"
];

const typingText = document.getElementById('typing-text');
let current = title;
let queue = [];
let lastShown = title;
let charIndex = 0;

function shuffle(array) {
    const a = [...array];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function nextText() {
    if (queue.length === 0) {
        queue = shuffle(texts);
        if (queue.length > 1 && queue[0] === lastShown) {
            [queue[0], queue[queue.length - 1]] = [queue[queue.length - 1], queue[0]];
        }
    }
    lastShown = queue.shift();
    return lastShown;
}

function type() {
    if (charIndex < current.length) {
        typingText.textContent += current.charAt(charIndex);
        charIndex++;
        setTimeout(type, 100);
    } else {
        setTimeout(erase, 200);
    }
}

function erase() {
    if (charIndex > 0) {
        typingText.textContent = current.substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, 50);
    } else {
        current = nextText();
        setTimeout(type, 500);
    }
}

document.addEventListener('DOMContentLoaded', type);