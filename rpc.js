const NODE_URL = 'http://[TU_IP_PUBLICA]:51473'; // Reemplaza con la IP real del VPS
const RPC_USER = 'divimonstruo';
const RPC_PASSWORD = 'divipachuli123';

export async function rpc(method, params = []) {
  const body = {
    jsonrpc: "1.0",
    id: "divimonsterwallet",
    method,
    params
  };

  try {
    const response = await fetch(NODE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Basic " + btoa(`${RPC_USER}:${RPC_PASSWORD}`)
      },
      body: JSON.stringify(body)
    });

    const result = await response.json();

    if (result.error) throw new Error(result.error.message);
    return result.result;

  } catch (err) {
    console.error("Error en RPC:", err.message);
    throw err;
  }
}







