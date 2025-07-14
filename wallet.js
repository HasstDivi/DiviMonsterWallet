async function depositarDivi() {
  try {
    const semilla = localStorage.getItem('semilla');
    if (!semilla) {
      alert('No se ha encontrado una semilla. Por favor, genera una primero.');
      return;
    }

    const respuesta = await fetch("https://138.68.94.212:3000/deposit", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ semilla }) // <-- enviamos la semilla
    });

    const data = await respuesta.json();
    if (data.direccion) {
      alert("Tu dirección de depósito es:\n" + data.direccion);
    } else {
      alert("Error: no se pudo generar la dirección.");
    }
  } catch (error) {
    console.error("Error al conectar con el servidor:", error);
    alert("No se pudo conectar con el servidor backend.");
  }
}
