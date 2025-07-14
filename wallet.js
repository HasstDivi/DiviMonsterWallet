let direccionUnica = null;

async function depositarDIVI() {
  if (direccionUnica) {
    alert("Tu dirección de depósito es:\n" + direccionUnica);
    return;
  }

  try {
    const respuesta = await fetch("https://138.68.94.212:3000/deposit", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });

    const data = await respuesta.json();

    if (data.direccion) {
      direccionUnica = data.direccion;
      alert("Tu dirección de depósito es:\n" + direccionUnica);
      mostrarSaldo();
    } else {
      alert("Error: no se pudo generar la dirección");
    }
  } catch (error) {
    console.error("Error al conectar con el servidor:", error);
    alert("No se pudo conectar con el servidor backend.");
  }
}

function mostrarSaldo() {
  // Reemplaza esta URL con tu endpoint real de saldo si es diferente
  fetch("https://138.68.94.212:3000/saldo")
    .then(res => res.json())
    .then(data => {
      if (data.saldo !== undefined) {
        const ventana = document.getElementById("saldo");
        ventana.innerText = `💰 Saldo actual: ${data.saldo} DIVI`;
        ventana.style.display = "block";
      }
    })
    .catch(err => console.error("Error al obtener saldo:", err));
}

// Funciones aún no implementadas pero mantenidas para estructura
function enviarDIVI() {
  alert("Función 'Enviar DIVI' en desarrollo.");
}

function crearVault() {
  alert("Función 'Crear bóveda' en desarrollo.");
}


