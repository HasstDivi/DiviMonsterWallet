import { generarBilleteraDivi } from './wallet.js';

document.getElementById('btnGenerar').addEventListener('click', () => {
  const resultado = generarBilleteraDivi();

  document.getElementById('direccion').innerText = `Dirección: ${resultado.direccion}`;
  document.getElementById('clave').innerText = `Clave privada (WIF): ${resultado.clavePrivada}`;
});
