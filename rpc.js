const API_URL = "http://divimonstruo.com";

async function getNewAddress() {
  const response = await fetch(`${API_URL}/getnewaddress`, {
    method: "POST",
  });
  const data = await response.json();
  return data.address;
}

async function getBalance(address) {
  const response = await fetch(`${API_URL}/getbalance`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ address }),
  });
  const data = await response.json();
  return data.balance;
}

async function sendToAddress(from, to, amount) {
  const response = await fetch(`${API_URL}/sendtoaddress`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ from, to, amount }),
  });
  const data = await response.json();
  return data.txid;
}

async function createVault(address, amount) {
  const response = await fetch(`${API_URL}/createvault`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ address, amount }),
  });
  const data = await response.json();
  return data.success;
}

async function getVaultRewards(address) {
  const response = await fetch(`${API_URL}/getvaultrewards`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ address }),
  });
  const data = await response.json();
  return data.rewards;
}
