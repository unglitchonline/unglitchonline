const URL_API = 'https://script.google.com/macros/s/AKfycbzAgBrptGvim0eki-_xzBShbm3UXoN9bjfZzVwjBywraP5rhVNweesfUSGuzqVjMhRi/exec';

async function guardarYMostrar() {
    const campo = document.getElementById("entrada-datos");
    const boton = document.querySelector("button");
    const texto = campo.value.trim();
    if (!texto) return;

    boton.disabled = true;
    try {
        await fetch(URL_API, {
            method: "POST",
            headers: { "Content-Type": "text/plain;charset=utf-8" },
            body: texto
        });
        campo.value = "";
        await mostrarDatosGuardados();
    } catch (err) {
        alert("No se pudo guardar, intenta de nuevo.");
    }
    boton.disabled = false;
}

async function mostrarDatosGuardados() {
    const contenedor = document.getElementById("mostrar-datos");
    try {
        const res = await fetch(URL_API);
        const registros = await res.json();
        contenedor.innerHTML = "";

        if (registros.length === 0) {
            contenedor.innerHTML = "<p>No hay registros guardados.</p>";
            return;
        }
        registros.forEach((r, i) => {
            const div = document.createElement("div");
            div.className = "registro";
            const num = document.createElement("strong");
            num.textContent = `🦋 ${i + 1}: `;
            div.appendChild(num);
            div.appendChild(document.createTextNode(r.texto));
            contenedor.appendChild(div);
        });
    } catch (err) {
        contenedor.innerHTML = "<p>No se pudieron cargar los registros.</p>";
    }
}

window.onload = mostrarDatosGuardados;