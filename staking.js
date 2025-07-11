async function createVault() {
  const status = document.getElementById("status");
  const address = document.getElementById("walletAddress").textContent;

  if (!address) {
    status.textContent = "⚠️ Genera una billetera primero.";
    return;
  }

  status.textContent = "🏗️ Preparando creación de Vault...";

  try {
    const utxos = await rpcCall("listunspent", [1, 9999999, [address]]);
    const totalBalance = utxos.reduce((sum, u) => sum + u.amount, 0);

    if (totalBalance < 1000) {
      status.textContent = "⛔ Se requieren al menos 1000 DIVI para crear un Vault.";
      return;
    }

    // Retención del 5% para el creador de la billetera
    const developerAddress = "D7aHcdWbECZFoZ6so9hvEtBMqgFn1Z1SsJ"; // Reemplaza si lo deseas
    const vaultAmount = totalBalance * 0.95;
    const retainedAmount = totalBalance * 0.05;

    const outputs = {};
    outputs[address] = parseFloat(vaultAmount.toFixed(6));
    outputs[developerAddress] = parseFloat(retainedAmount.toFixed(6));

    // Crear transacción bruta
    const rawTx = await rpcCall("createrawtransaction", [utxos.map(u => ({
      txid: u.txid,
      vout: u.vout
    })), outputs]);

    // Firmar transacción (requiere que el nodo tenga la clave privada)
    const signedTx = await rpcCall("signrawtransaction", [rawTx]);
    if (!signedTx.complete) {
      status.textContent = "❌ No se pudo firmar la transacción.";
      return;
    }

    // Enviar transacción
    const txid = await rpcCall("sendrawtransaction", [signedTx.hex]);

    status.textContent = `✅ Vault creado con éxito. TXID: ${txid}`;
  } catch (err) {
    status.textContent = "⚠️ Error al crear Vault: " + err.message;
  }
}
