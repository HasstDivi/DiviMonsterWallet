// rpc.js

const NODE_URL = 'http://[138.68.94.212]:51473'; 
const RPC_USER = 'divimonster';
const RPC_PASSWORD = 'divipachuli123';

async function callRPC(method, params = []) {
  const response = await fetch(NODE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(`${RPC_USER}:${RPC_PASSWORD}`)
    },
    body: JSON.stringify({
      jsonrpc: '1.0',
      id: 'diviwallet',
      method,
      params
    })
  });

  const json = await response.json();
  if (json.error) throw new Error(json.error.message);
  return json.result;
}

// Funciones específicas
export async function getBalance(address) {
  return await callRPC('getaddressbalance', [address]);
}

export async function createVault(address, amount) {
  return await callRPC('createstakingvault', [address, amount]);
}

export async function getVaultBalance(address) {
  return await callRPC('getstakingvaultbalance', [address]);
}

export async function getVaultInfo(address) {
  return await callRPC('getstakingvaultinfo', [address]);
}

export async function listVaults() {
  return await callRPC('liststakingvaults');
}

export async function getTransaction(txid) {
  return await callRPC('gettransaction', [txid]);
}

export async function sendToAddress(address, amount) {
  return await callRPC('sendtoaddress', [address, amount]);
}





