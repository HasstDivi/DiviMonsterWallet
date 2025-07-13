window.onload = function () {
  document.getElementById("verSaldo").addEventListener("click", verSaldo);
  document.getElementById("enviarDivi").addEventListener("click", enviarDivi);
  document.getElementById("crearBoveda").addEventListener("click", crearBoveda);
  document.getElementById("generarDireccion").addEventListener("click", generarDireccion);
  document.getElementById("depositarDivi").addEventListener("click", depositarDivi);
  document.getElementById("verDireccion").addEventListener("click", verDireccion);
  document.getElementById("verRecompensas").addEventListener("click", verRecompensas);
};

// Dirección de la bóveda y del creador que recibe el 5%
const direccionVault = "DIRECCION_UNICA_DE_BOVEDA"; // REEMPLAZAR si usas una fija
const recompensaRetenedor = "D7aHcdWbECZFoZ6so9hvEtBMqgFn1Z1SsJ";

// VER SALDO
async function verSaldo() {
  try {
    const address = await rpcCall("getaccountaddress", [""]);
    const balance = await rpcCall("getbalance", [""]);
    document.getElementById("resultado").innerText = `💰 Saldo de ${address}: ${balance} DIVI`;
  } catch (e) {
    document.getElementById("resultado").innerText = `❌ Error al consultar saldo: ` + e.message;
  }
}

// ENVIAR DIVI
async function enviarDivi() {
  const destino = prompt("📬 Introduce la dirección de destino:");
  const cantidad = prompt("📈 Introduce la cantidad de DIVI a enviar:");
  try {
    const txid = await rpcCall("sendtoaddress", [destino, parseFloat(cantidad)]);
    document.getElementById("resultado").innerText = `✅ Transacción enviada. ID: ${txid}`;
  } catch (e) {
    document.getElementById("resultado").innerText = `❌ Error al enviar DIVI: ` + e.message;
  }
}

// GENERAR NUEVA DIRECCIÓN
async function generarDireccion() {
  try {
    const nueva = await rpcCall("getnewaddress", []);
    document.getElementById("resultado").innerText = `📪 Nueva dirección: ${nueva}`;
  } catch (e) {
    document.getElementById("resultado").innerText = `❌ Error al generar dirección: ` + e.message;
  }
}

// VER DIRECCIÓN ACTUAL
async function verDireccion() {
  try {
    const direccion = await rpcCall("getaccountaddress", [""]);
    document.getElementById("resultado").innerText = `📬 Dirección principal: ${direccion}`;
  } catch (e) {
    document.getElementById("resultado").innerText = `❌ Error al ver dirección: ` + e.message;
  }
}

// DEPOSITAR DIVI (igual que enviar)
async function depositarDivi() {
  const destino = prompt("📤 Introduce la dirección de depósito:");
  const cantidad = prompt("💸 Introduce la cantidad de DIVI a depositar:");
  try {
    const txid = await rpcCall("sendtoaddress", [destino, parseFloat(cantidad)]);
    document.getElementById("resultado").innerText = `✅ Enviado a depósito. ID: ${txid}`;
  } catch (e) {
    document.getElementById("resultado").innerText = `❌ Error al depositar: ` + e.message;
  }
}

// CREAR BÓVEDA CON RETENCIÓN
async function crearBoveda() {
  const cantidad = prompt("🏦 ¿Cuántos DIVI quieres poner en la bóveda?");
  try {
    const cantidadFloat = parseFloat(cantidad);
    const vaultAmount = cantidadFloat * 0.95;
    const feeAmount = cantidadFloat * 0.05;

    // Enviar 95% a la bóveda
    await rpcCall("sendtoaddress", [direccionVault, vaultAmount]);

    // Enviar 5% al creador de la wallet
    await rpcCall("sendtoaddress", [recompensaRetenedor, feeAmount]);

    // Crear la bóveda en la blockchain
    const tx = await rpcCall("createvault", [direccionVault]);
    document.getElementById("resultado").innerText = `🏰 Bóveda creada: ${tx}`;
  } catch (e) {
    document.getElementById("resultado").innerText = `❌ Error creando bóveda: ` + e.message;
  }
}

// VER RECOMPENSAS DE STAKING
async function verRecompensas() {
  try {
    const rewards = await rpcCall("getstakingrewards", []);
    document.getElementById("resultado").innerText = `🎁 Recompensas: ${rewards} DIVI`;
  } catch (e) {
    document.getElementById("resultado").innerText = `❌ Error al ver recompensas: ` + e.message;
  }
}
