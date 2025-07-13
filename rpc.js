const RPC_URL = "https://138.68.94.212:51473/";

async function rpcCall(method, params = []) {
  const body = {
    jsonrpc: "1.0",
    id: "divimonster",
    method,
    params
  };

  const response = await fetch(RPC_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  const data = await response.json();
  if (data.error) throw new Error(data.error.message);
  return data.result;
}

  
