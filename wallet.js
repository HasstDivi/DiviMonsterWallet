function mostrarEstado(mensaje) {
  document.getElementById('estado').innerHTML = mensaje;
}

function verSaldo() {
  fetch('/getbalance', { method: 'POST' })
    .then(res => res.json())
    .then(data => mostrarEstado(`Saldo actual: ${data}`))
    .catch(err => mostrarEstado(`Error: ${err}`));
}

function enviarDivi() {
  const address = prompt("Introduce la dirección de destino:");
  const amount = prompt("¿Cuántos DIVI quieres enviar?");
  fetch('/sendtoaddress', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ address, amount })
  })
    .then(res => res.json())
    .then(data => mostrarEstado(`Transacción enviada: ${data}`))
    .catch(err => mostrarEstado(`Error al enviar: ${err}`));
}

function crearBoveda() {
  const address = prompt("Introduce tu dirección de depósito:");
  const amount = prompt("Cantidad a bloquear en la bóveda:");
  fetch('/createvault', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ address, amount })
  })
    .then(res => res.json())
    .then(data => mostrarEstado(`Bóveda creada: ${data}`))
    .catch(err => mostrarEstado(`Error al crear bóveda: ${err}`));
}

function generarDireccion() {
  fetch('/getnewaddress', { method: 'POST' })
    .then(res => res.json())
    .then(data => mostrarEstado(`Nueva dirección generada: ${data}`))
    .catch(err => mostrarEstado(`Error al generar dirección: ${err}`));
}

function depositarDivi() {
  fetch('/getnewaddress', { method: 'POST' })
    .then(res => res.json())
    .then(data => mostrarEstado(`Deposita tus DIVI en esta dirección: ${data}`))
    .catch(err => mostrarEstado(`Error al obtener dirección de depósito: ${err}`));
}
