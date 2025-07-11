// === Configuración del nodo RPC ===
const RPC_USER = "diviuser";
const RPC_PASS = "divipass123";
const RPC_HOST = "http://TU_IP_PUBLICA:51473"; // Reemplaza por la IP real de tu VPS

async function rpcCall(method, params = []) {
  const response = await fetch(RPC_HOST, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Basic " + btoa(`${RPC_USER}:${RPC_PASS}`)
    },
    body: JSON.stringify({
      jsonrpc: "1.0",
      id: "divimonster",
      method,
      params
    })
  });

  if (!response.ok) {
    throw new Error(`Error RPC: ${response.status} - ${response.statusText}`);
  }

  const data = await response.json();
  if (data.error) throw new Error(data.error.message);
  return data.result;
}

// === Ver saldo de dirección ===
async function checkBalance() {
  const address = document.getElementById("walletAddress").textContent;
  const status = document.getElementById("status");
  status.textContent = "Consultando saldo...";

  try {
    const utxos = await rpcCall("listunspent", [0, 9999999, [address]]);
    const balance = utxos.reduce((sum, utxo) => sum + utxo.amount, 0);
    status.textContent = `💰 Saldo actual: ${balance.toFixed(6)} DIVI`;
  } catch (err) {
    status.textContent = "⚠️ Error al consultar saldo: " + err.message;
  }
}

// === Enviar transacción (esquemático, requiere más seguridad) ===
async function sendDivi() {
  const status = document.getElementById("status");
  status.textContent = "Función de envío aún en construcción (por seguridad).";
}
