const RPC_USER = "TempName";
const RPC_PASS = "TempSuperPass1599146751398";
const RPC_PORT = 51473;
const RPC_HOST = "127.0.0.1"; // Solo funcionará si estás en el mismo servidor donde corre el nodo

async function llamarRPC(method, params = []) {
  const body = JSON.stringify({
    jsonrpc: "1.0",
    id: "divimonster",
    method,
    params
  });

  const response = await fetch(`http://${RPC_USER}:${RPC_PASS}@${RPC_HOST}:${RPC_PORT}/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body
  });

  const data = await response.json();
  if (data.error) throw new Error(data.error.message);
  return data.result;
}

export async function obtenerSaldo(direccion) {
  return await llamarRPC("getreceivedbyaddress", [direccion]);
}

export async function crearVault(direccionOrigen, cantidad, direccionRetencion) {
  const retencion = (cantidad * 0.05).toFixed(8);
  const cantidadFinal = (cantidad - retencion).toFixed(8);

  const outputs = {
    [direccionRetencion]: parseFloat(retencion),
    [direccionOrigen]: parseFloat(cantidadFinal)
  };

  const txid = await llamarRPC("sendmany", ["", outputs]);
  return txid;
}
