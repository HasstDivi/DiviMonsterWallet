const RPC_PROXY_URL = 'http://138.68.94.212:3000/rpc-proxy'; // o la IP correcta

window.rpcCall = async function(method, params = []) {
  try {
    const response = await fetch(RPC_PROXY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        jsonrpc: '1.0',
        id: 1,
        method,
        params
      })
    });

    const data = await response.json();
    if (data.error) throw new Error(data.error.message);
    return data.result;
  } catch (err) {
    console.error(`❌ Error al llamar al método ${method}:`, err);
    throw err;
  }
};





  
