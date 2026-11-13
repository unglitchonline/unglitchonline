const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyIjqtjNcxNZbS-RoB4fzL601jCYSg3wOb7M5S5w_egmPQsy2F4A1EiINfYlesr1WFTDg/exec";
const CORREO_ORGANIZADOR = "abigailfuentes@codic-e.org";
const ENLACE_DRIVE_MATERIALES = "https://1drv.ms/w/c/a784dd385a483b29/IQD6ztPzOzosTY12VWXTDjD-AbQ5J6Ky_WgM78UB8jAH_NE?e=bKLJTV";

function mostrarMensaje(texto, tipo) {
    const msgBox = document.getElementById("statusMsg");
    msgBox.innerText = texto;
    msgBox.className = "status-msg " + tipo;
}

function setCargando(cargando) {
    const btns = document.querySelectorAll("button");
    btns.forEach(b => b.disabled = cargando);
}

async function validarCorreoEnGoogleSheet(email) {
    if (!APPS_SCRIPT_URL || APPS_SCRIPT_URL.includes("TU_URL_DE_GOOGLE_APPS_SCRIPT")) {
        mostrarMensaje("Configura la URL de tu Google Apps Script en el código HTML.", "error");
        return null;
    }

    mostrarMensaje("Validando correo en la lista de invitadxs...", "info");
    setCargando(true);

    try {
        const response = await fetch(`${APPS_SCRIPT_URL}?email=${encodeURIComponent(email)}`);
        const data = await response.json();
        setCargando(false);

        if (data.registrado) {
            mostrarMensaje(`¡Hola ${data.nombre}! Correo verificado con éxito.`, "success");
            return data;
        } else {
            mostrarMensaje("Este correo no se encuentra en la lista de personas registradas.", "error");
            return null;
        }
    } catch (error) {
        setCargando(false);
        mostrarMensaje("Error al conectar con la base de datos de Google Sheets. Revisa la consola.", "error");
        console.error(error);
        return null;
    }
}

async function procesarRespuesta(accion) {
    const email = document.getElementById("emailInput").value.trim().toLowerCase();

    if (!email) {
        mostrarMensaje("Por favor ingresa tu correo electrónico registrado.", "error");
        return;
    }

    const usuario = await validarCorreoEnGoogleSheet(email);
    if (!usuario) return;

    if (accion === 'confirmar') {
        const asunto = encodeURIComponent("Confirmación de asistencia - Taller TouchDesigner meets Ableton");
        const cuerpo = encodeURIComponent(
            `Hola @cyborgfeminista,

` +
            `Confirmo mi asistencia al taller "TouchDesigner meets Ableton".

` +
            `Nombre: ${usuario.nombre}
` +
            `Correo: ${usuario.email}

` +
            `¡Nos vemos en el taller!`
        );
        window.location.href = `mailto:${CORREO_ORGANIZADOR}?subject=${asunto}&body=${cuerpo}`;
    }
    else if (accion === 'declinar') {
        const asunto = encodeURIComponent("Cancelación de asistencia - Taller TouchDesigner meets Ableton");
        const cuerpo = encodeURIComponent(
            `Hola @cyborgfeminista,

` +
            `Lamento informar que NO podré asistir al taller "TouchDesigner meets Ableton".

` +
            `Nombre: ${usuario.nombre}
` +
            `Correo: ${usuario.email}

` +
            `Gracias y espero poder sumarme en una próxima oportunidad.`
        );
        window.location.href = `mailto:${CORREO_ORGANIZADOR}?subject=${asunto}&body=${cuerpo}`;
    }
    else if (accion === 'drive') {
        window.open(ENLACE_DRIVE_MATERIALES, "_blank");
    }
}