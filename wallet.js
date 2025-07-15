let direccionUnica = null;
const backendURL = "http://138.68.94.212:3000"; // Cambia si usas otro dominio/IP

// 🔥 Depositar DIVI (genera dirección única + muestra saldo)
async function depositarDivi() {
  try {
    const res = await fetch(`${backendURL}/deposit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });

    const data = await res.json();
    if (data.direccion) {
      direccionUnica = data.direccion;
      alert("Tu dirección única de depósito es:\n" + direccionUnica);
      mostrarSaldo();
    } else {
      alert("No se pudo obtener la dirección.");
    }
  } catch (e) {
    alert("❌ Error al conectar con el servidor backend.");
    console.error(e);
  }
}

// 📤 Enviar DIVI
async function enviarDivi() {
  const destino = prompt("📬 Dirección de destino:");
  const cantidad = prompt("💸 Cantidad de DIVI a enviar:");
  if (!destino || !cantidad) return;

  try {
    const res = await fetch(`${backendURL}/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ destino, cantidad: parseFloat(cantidad) })
    });

    const data = await res.json();
    if (data.success) {
      alert("✅ Transacción enviada con éxito. ID:\n" + data.txid);
    } else {
      alert("❌ Error al enviar: " + data.message);
    }
  } catch (e) {
    alert("❌ No se pudo enviar la transacción.");
    console.error(e);
  }
}

// 🏰 Crear bóveda con retención
async function crearBoveda() {
  const cantidad = prompt("🏦 ¿Cuántos DIVI deseas guardar en la bóveda?");
  if (!cantidad || isNaN(cantidad)) return;

  try {
    const res = await fetch(`${backendURL}/create-vault`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cantidad: parseFloat(cantidad) })
    });

    const data = await res.json();
    if (data.success) {
      alert("🏰 Bóveda creada con éxito. TXID:\n" + data.txid);
    } else {
      alert("❌ Error al crear bóveda: " + data.message);
    }
  } catch (e) {
    alert("❌ No se pudo conectar al backend.");
    console.error(e);
  }
}

// 💰 Mostrar saldo automáticamente
async function mostrarSaldo() {
  try {
    const res = await fetch(`${backendURL}/balance`);
    const data = await res.json();

    if (data.saldo !== undefined) {
      const saldoDiv = document.getElementById("saldo");
      saldoDiv.innerText = `💰 Saldo actual: ${data.saldo} DIVI`;
      saldoDiv.style.display = "block";
    }
  } catch (e) {
    console.error("❌ No se pudo consultar el saldo:", e);
  }
}

// 👁️ Ver saldo manual
function verSaldo() {
  mostrarSaldo();
}

// 🎯 Generar dirección
async function generarDireccion() {
  try {
    const res = await fetch(`${backendURL}/new-address`);
    const data = await res.json();

    if (data.direccion) {
      direccionUnica = data.direccion;
      alert("🎯 Dirección generada:\n" + direccionUnica);
    } else {
      alert("❌ No se pudo generar dirección.");
    }
  } catch (e) {
    alert("❌ Error al generar dirección.");
    console.error(e);
  }
}

// 📫 Ver dirección activa
function verDireccion() {
  if (direccionUnica) {
    alert("📫 Tu dirección actual es:\n" + direccionUnica);
  } else {
    alert("❌ No has generado una dirección aún.");
  }
}

// 🎉 Ver recompensas de staking
async function verRecompensas() {
  try {
    const res = await fetch(`${backendURL}/recompensas`);
    const data = await res.json();

    if (data.recompensas !== undefined) {
      alert("🎉 Recompensas actuales: " + data.recompensas + " DIVI");
    } else {
      alert("❌ No se pudieron obtener las recompensas.");
    }
  } catch (e) {
    alert("❌ Error al consultar recompensas.");
    console.error(e);
  }
  async function probarConexion() {
  try {
    const respuesta = await fetch('http://138.68.94.212:3000/getblockcount', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
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

    });

    const datos = await respuesta.json();
    alert('✅ Conectado. Altura de bloque: ' + datos.result);
  } catch (error) {
    alert('❌ Error de conexión con el backend.');
    console.error('Error al conectar:', error);
  }
}



