async function verSaldo() {
  try {
    const address = await rpcCall("getaccountaddress", [""]);
    const balance = await rpcCall("getbalance", [""]);
    document.getElementById("resultado").innerText = `💰 Saldo de ${address}: ${balance} DIVI`;
  } catch (e) {
    document.getElementById("resultado").innerText = "❌ Error al consultar saldo: " + e.message;
  }
}

async function enviarDivi() {
  const destino = prompt("📤 Introduce la dirección de destino:");
  const cantidad = prompt("💸 Introduce la cantidad de DIVI a enviar:");
  try {
    const txid = await rpcCall("sendtoaddress", [destino, parseFloat(cantidad)]);
    document.getElementById("resultado").innerText = `✅ Transacción enviada. ID: ${txid}`;
  } catch (e) {
    document.getElementById("resultado").innerText = "❌ Error al enviar DIVI: " + e.message;
  }
}

async function generarDireccion() {
  try {
    const nueva = await rpcCall("getnewaddress");
    document.getElementById("resultado").innerText = `📬 Nueva dirección: ${nueva}`;
  } catch (e) {
    document.getElementById("resultado").innerText = "❌ Error al generar dirección: " + e.message;
  }
}

async function verDireccion() {
  try {
    const direccion = await rpcCall("getaccountaddress", [""]);
    document.getElementById("resultado").innerText = `🏠 Dirección principal: ${direccion}`;
  } catch (e) {
    document.getElementById("resultado").innerText = "❌ Error al obtener dirección: " + e.message;
  }
}

async function depositarDivi() {
  alert("💡 Deposita los DIVI desde otro wallet a tu dirección mostrada con 'Ver dirección'");
}
async function crearBoveda() {
  const cantidad = prompt("💰 ¿Cuántos DIVI deseas meter al Vault?");
  const direccionVault = await rpcCall("getnewvaultaddress");
  const direccionPropietario = await rpcCall("getaccountaddress", [""]);
  const recompensaRetenedor = "D7aHcdWbECZFoZ6so9hvEtBMqgFn1Z1SsJ";

  try {
    // Enviar el 95% a la bóveda y 5% a ti (como fee)
    const cantidadFloat = parseFloat(cantidad);
    const vaultAmount = cantidadFloat * 0.95;
    const feeAmount = cantidadFloat * 0.05;

    await rpcCall("sendtoaddress", [direccionVault, vaultAmount]);
    await rpcCall("sendtoaddress", [recompensaRetenedor, feeAmount]);

    const tx = await rpcCall("createvault", [direccionVault]);
    document.getElementById("resultado").innerText = `✅ Bóveda creada: ${tx}`;
  } catch (e) {
    document.getElementById("resultado").innerText = "❌ Error creando bóveda: " + e.message;
  }
}

async function verRecompensas() {
  try {
    const rewards = await rpcCall("getstakingrewards", []);
    document.getElementById("resultado").innerText = `🎁 Recompensas: ${rewards} DIVI`;
  } catch (e) {
    document.getElementById("resultado").innerText = "❌ Error al ver recompensas: " + e.message;
  }
}
document.getElementById("verSaldo").addEventListener("click", verSaldo);
document.getElementById("enviarDivi").addEventListener("click", enviarDivi);
document.getElementById("crearBoveda").addEventListener("click", crearBoveda);
document.getElementById("generarDireccion").addEventListener("click", generarDireccion);
document.getElementById("verDireccion").addEventListener("click", verDireccion);
document.getElementById("depositarDivi").addEventListener("click", depositarDivi);
document.getElementById("verRecompensas").addEventListener("click", verRecompensas);


 
