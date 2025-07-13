// rpc.js
const rpcUser = "divimonstruo";
const rpcPassword = "divipachuli123";
const rpcPort = 51473; // Puerto por defecto de RPC de Divi
const rpcHost = "138.68.94.212"; // Cambiar si usas IP o dominio distinto

async function rpcCall(method, params = []) {
  const body = {
    jsonrpc: "1.0",
    id: "divi",
    method,
    params
  };

  const response = await fetch(`${rpcHost}:${rpcPort}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + btoa(`${rpcUser}:${rpcPassword}`)
    },
    body: JSON.stringify(body)
  });

  const json = await response.json();
  if (json.error) throw new Error(json.error.message);
  return json.result;
}







