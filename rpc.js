const RPC_USER = "DiviMonstruo";
const RPC_PASSWORD = "divipachuli123";
const RPC_URL = "http://138.68.94.212:51473/";

async function rpcCall(method, params = []) {
  const response = await fetch(RPC_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "1.0",
      id: "divimonster",
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







