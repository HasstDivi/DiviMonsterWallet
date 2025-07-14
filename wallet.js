async function depositarDivi() {
  try {
    const respuesta = await fetch('https://138.68.94.212:3000/deposit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });

    const data = await respuesta.json();
    if (data.direccion) {
      alert("Tu dirección de depósito es:\n" + data.direccion);
    } else {
      alert("Error: no se pudo generar la dirección");
    }
  } catch (error) {
    console.error("Error al conectar con el servidor:", error);
    alert("No se pudo conectar con el servidor backend.");
  }
}
