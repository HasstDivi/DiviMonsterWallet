// billetera.js
async function verSaldo() {
  try {
    const balance = await rpcCall("getbalance");
    document.getElementById("estado").innerText = `Saldo disponible: ${balance} DIVI`;
  } catch (e) {
    document.getElementById("estado").innerText = `⚠️ Error: ${e.message}`;
  }
}

async function enviarDivi() {
  const destino = prompt("Introduce la dirección de destino:");
  const cantidad = prompt("¿Cuántos DIVI deseas enviar?");
  try {
    const txid = await rpcCall("sendtoaddress", [destino, parseFloat(cantidad)]);
    document.getElementById("estado").innerText = `✅ Enviado. TXID: ${txid}`;
  } catch (e) {
    document.getElementById("estado").innerText = `⚠️ Error al enviar: ${e.message}`;
  }
}


