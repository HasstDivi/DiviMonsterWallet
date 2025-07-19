let direccionUnica = localStorage.getItem("direccionDivi");

// Mostrar dirección única si ya fue generada
if (direccionUnica) {
  actualizarEstado(`📬 Dirección de depósito: ${direccionUnica}`);
}

// ENVÍO DE DIVI
async function enviarDivi() {
  const destino = prompt("📬 Introduce la dirección de destino:");
  const cantidad = prompt("📈 Introduce la cantidad de DIVI a enviar:");
  if (!destino || !cantidad) return;

  try {
    const txid = await sendToAddress(null, destino, parseFloat(cantidad));
    actualizarEstado(`✅ Transacción enviada. ID: ${txid}`);
  } catch (e) {
    actualizarEstado(`❌ Error al enviar DIVI: ${e.message}`);
  }
}

// DEPOSITAR DIVI (genera dirección única si no existe)
async function depositarDivi() {
  try {
    if (!direccionUnica) {
      direccionUnica = await getNewAddress();
      localStorage.setItem("direccionDivi", direccionUnica);
      document.getElementById("direccion").innerText = direccionUnica;
      actualizarEstado(`📪 Dirección única generada: ${direccionUnica}`);
    } else {
      actualizarEstado(`📬 Dirección de depósito: ${direccionUnica}`);
    }
  } catch (e) {
    actualizarEstado(`❌ Error al generar dirección: ${e.message}`);
  }
}

// CREAR BÓVEDA
async function crearBoveda() {
  if (!direccionUnica) {
    actualizarEstado("⚠️ Necesitas una dirección generada antes.");
    return;
  }
// ENVIAR DIVI
async function enviarDivi() {
  const destino = document.getElementById("destino").value;
  const cantidad = document.getElementById("cantidad").value;

  if (!destino || !cantidad) {
    actualizarEstado("⚠️ Dirección o cantidad vacía");
    return;
  }

  try {
    const res = await fetch(`${BASE_URL}/send?to=${destino}&amount=${cantidad}`);
    const txid = await res.text();
    actualizarEstado(`✅ Transacción enviada. ID: ${txid}`);
  } catch (e) {
    actualizarEstado(`❌ Error al enviar DIVI: ${e.message}`);
  }
}

  const cantidad = prompt("🏦 ¿Cuántos DIVI quieres poner en la bóveda?");
  const cantidadFloat = parseFloat(cantidad);
  if (isNaN(cantidadFloat)) return;

  try {
    const resultado = await createVault(direccionUnica, cantidadFloat);
    actualizarEstado(`🏰 Bóveda creada con éxito: ${resultado}`);
  } catch (e) {
    actualizarEstado(`❌ Error creando bóveda: ${e.message}`);
  }
}

// VER RECOMPENSAS
async function verRecompensas() {
  if (!direccionUnica) {
    actualizarEstado("⚠️ No se puede consultar recompensas sin dirección.");
    return;
  }

  try {
    const rewards = await getVaultRewards(direccionUnica);
    actualizarEstado(`🎁 Recompensas: ${rewards} DIVI`);
  } catch (e) {
    actualizarEstado(`❌ Error al ver recompensas: ${e.message}`);
  }
}

// Mostrar resultado en la interfaz
function actualizarEstado(mensaje) {
  const estado = document.getElementById("estado");
  estado.innerText = mensaje;
}
