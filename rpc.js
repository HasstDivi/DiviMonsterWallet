// rpc.js
const RPC_USER = "DivinoMonstruo";
const RPC_PASSWORD = "divipachuli123";
const RPC_PORT = 51473;
const RPC_HOST = "138.68.94.212";

async function rpcCall(method, params = []) {
  const response = await fetch(`http://${RPC_HOST}:${RPC_PORT}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "1.0",
      id: "DiviMonsterWallet",
      method,
      params,
    }),
  });

  const data = await response.json();
  if (data.error) {
    throw new Error(data.error.message);
  }
  return data.result;
}




