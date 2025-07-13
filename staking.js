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


  
  
