let direccionUnica = null;
const backendURL = "http://138.68.94.212:3000"; // Cambia esto si usas otro dominio/IP

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

// 🏛️ Crear bóveda con retención
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
