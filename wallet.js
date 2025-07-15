async function probarConexion() {
  try {
    const respuesta = await fetch('http://138.68.94.212:3000/rpc-proxy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '1.0',
        id: 1,
        method: 'getblockcount',
        params: []
      })
    });

    const datos = await respuesta.json();
    alert("✅ Conectado. Altura de bloque: " + datos.result);
  } catch (error) {
    alert("❌ Error de conexión con el backend.");
    console.error("Error al conectar:", error);
  }
}
