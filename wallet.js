// Dirección del servidor proxy
const RPC_PROXY_URL = 'http://138.68.94.212:3000/rpc-proxy';

async function rpcCall(method, params = []) {
  try {
    const response = await fetch(RPC_PROXY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '1.0',
        id: 1,
        method,
        params,
      }),
    });
    const data = await response.json();
    if (data.error) throw new Error(data.error.message);
    return data.result;
  } catch (err) {
    console.error(`Error al llamar al método ${method}:`, err);
    throw err;
  }
}

// Ver saldo
async function verSaldo() {
  try {
    const saldo = await rpcCall('getbalance');
    alert(`🔍 Tu saldo es: ${saldo} DIVI`);
  } catch (e) {
    alert("❌ Error al consultar saldo.");
    console.error(e);
  }
}

// Enviar DIVI
async function enviarDivi() {
  const address = prompt("📬 Dirección de destino:");
  const amount = prompt("💸 Cantidad a enviar:");
  if (!address || !amount) return;

  try {
    const txid = await rpcCall('sendtoaddress', [address, parseFloat(amount)]);
    alert(`✅ Transacción enviada. TXID: ${txid}`);
  } catch (e) {
    alert("❌ Error al enviar DIVI.");
    console.error(e);
  }
}

// Crear bóveda
async function crearVault() {
  const address = prompt("🏦 Dirección de la bóveda:");
  const amount = prompt("💰 Cantidad a depositar:");
  if (!address || !amount) return;

  try {
    const result = await rpcCall('createvault', [address, parseFloat(amount)]);
    alert(`✅ Bóveda creada. ID: ${result}`);
  } catch (e) {
    alert("❌ Error al crear bóveda.");
    console.error(e);
  }
}

// Depositar en bóveda (usa sendtoaddress)
async function depositarDivi() {
  const address = prompt("📥 Dirección de depósito:");
  const amount = prompt("💰 Cantidad a depositar:");
  if (!address || !amount) return;

  try {
    const txid = await rpcCall('sendtoaddress', [address, parseFloat(amount)]);
    alert(`✅ DIVI depositado. TXID: ${txid}`);
  } catch (e) {
    alert("❌ Error al depositar DIVI.");
    console.error(e);
  }
}

// Generar nueva dirección
async function generarDireccion() {
  try {
    const address = await rpcCall('getnewaddress');
    alert(`🆕 Nueva dirección generada:\n${address}`);
  } catch (e) {
    alert("❌ Error al generar dirección.");
    console.error(e);
  }
}

// Ver dirección actual
async function verDireccion() {
  try {
    const address = await rpcCall('getaccountaddress', ['']);
    alert(`📫 Tu dirección actual:\n${address}`);
  } catch (e) {
    alert("❌ Error al consultar dirección.");
    console.error(e);
  }
}

// Probar conexión con el backend
async function probarConexion() {
  try {
    const response = await fetch('http://138.68.94.212:3000/getblockcount', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    });
    const datos = await response.json();
    alert(`✅ Conectado. Altura de bloque: ${datos.result}`);
  } catch (error) {
    alert("❌ Error de conexión con el backend.");
    console.error('Error al conectar:', error);
  }
}
