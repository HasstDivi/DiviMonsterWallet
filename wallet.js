// wallet.js

import { openVault, checkVaultStatus, verVaults } from './vaults.js';

document.addEventListener('DOMContentLoaded', () => {
  const btnCrearVault = document.getElementById('crearVaultBtn');
  const inputCantidad = document.getElementById('cantidadDivi');
  const resultadoDiv = document.getElementById('resultado');
  const estadoDiv = document.getElementById('estadoVault');

  btnCrearVault.addEventListener('click', async () => {
    const cantidad = inputCantidad.value;
    resultadoDiv.innerHTML = '⏳ Procesando...';

    try {
      const txid = await openVault(cantidad);
      resultadoDiv.innerHTML = `✅ Vault creado con éxito. TXID: <code>${txid}</code>`;
    } catch (error) {
      resultadoDiv.innerHTML = `❌ Error al crear el Vault: ${error.message}`;
    }
  });

  const btnEstado = document.getElementById('estadoVaultBtn');
  btnEstado.addEventListener('click', async () => {
    estadoDiv.innerHTML = '⏳ Consultando...';

    try {
      const estado = await checkVaultStatus();
      if (!estado) {
        estadoDiv.innerHTML = '❌ No se pudo obtener información del Vault';
        return;
      }

      estadoDiv.innerHTML = `
        <ul>
          <li>📦 Activo: ${estado.activo ? '✅ Sí' : '❌ No'}</li>
          <li>💰 Balance: ${estado.balance} DIVI</li>
          <li>🎟️ Participa en lotería: ${estado.participandoLoteria ? '🎉 Sí' : '🚫 No'}</li>
          <li>⏱️ Edad: ${estado.edad} bloques</li>
          <li>🕒 Última recompensa: ${estado.ultimaRecompensa}</li>
        </ul>
      `;
    } catch (error) {
      estadoDiv.innerHTML = `❌ Error: ${error.message}`;
    }
  });
});

