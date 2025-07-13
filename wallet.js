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


 
