const RPC_USER = "DivinoMonstruo";
const RPC_PASSWORD = "divipachuli123";
const RPC_PORT = 51473;
const RPC_HOST = "http://138.68.94.212"; // IP de tu VPS

async function rpcCall(method, params = []) {
  const body = {
    jsonrpc: "1.0",
    id: "curltest",
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
  if (data.error) {
    throw new Error(data.error.message);
  }
  return data.result;
}




