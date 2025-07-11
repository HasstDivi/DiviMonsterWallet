const RPC_USER = "diviuser";
const RPC_PASSWORD = "divipass123";
const RPC_PORT = 51473;
const RPC_HOST = "http://TU_IP_PUBLICA_DEL_NODO"; // Cambia esto por tu IP

async function rpcCall(method, params = []) {
  const body = {
    jsonrpc: "1.0",
    id: "curltext",
    method,
    params,
  };

  const response = await fetch(`${RPC_HOST}:${RPC_PORT}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + btoa(`${RPC_USER}:${RPC_PASSWORD}`),
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  return data.result;
}

