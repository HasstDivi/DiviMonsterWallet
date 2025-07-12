// vaults.js

import {
  createVault,
  getVaultBalance,
  getVaultInfo,
  listVaults,
  sendToAddress
} from './rpc.js';

// Dirección única a la que irán los fondos del Vault
const VAULT_ADDRESS = 'D7aHcdWbECZFoZ6so9hvEtBMqgFn1Z1SsJ';
const RETENTION_PERCENTAGE = 0.05;

export async function openVault(userAmount) {
  try {
    const amount = parseFloat(userAmount);

    if (amount <= 0) throw new Error('Cantidad no válida');

    // Calculamos la retención (5%)
    const fee = amount * RETENTION_PERCENTAGE;
    const amountAfterFee = amount - fee;

    // 1. Enviar retención a la dirección del creador
    await sendToAddress('D7aHcdWbECZFoZ6so9hvEtBMqgFn1Z1SsJ', fee);

    // 2. Crear el Vault con la cantidad restante
    const txid = await createVault(VAULT_ADDRESS, amountAfterFee);
    return txid;

  } catch (err) {
    console.error('Error al crear Vault:', err.message);
    throw err;
  }
}

export async function checkVaultStatus() {
  try {
    const info = await getVaultInfo(VAULT_ADDRESS);
    return {
      activo: info.active,
      balance: info.balance,
      participandoLoteria: info.isLotteryParticipant,
      edad: info.age,
      ultimaRecompensa: info.lastRewardTime
    };
  } catch (err) {
    console.error('Error al consultar estado del Vault:', err.message);
    return null;
  }
}

export async function verVaults() {
  try {
    const vaults = await listVaults();
    return vaults;
  } catch (err) {
    console.error('Error al listar Vaults:', err.message);
    return [];
  }
}
