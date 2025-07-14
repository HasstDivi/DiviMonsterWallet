document.addEventListener("DOMContentLoaded", () => {
  const depositButton = document.getElementById("depositar");
  const direccionDiv = document.getElementById("direccion");

  let direccionGenerada = null;

  depositButton.addEventListener("click", async () => {
    if (direccionGenerada) {
      direccionDiv.textContent = "Dirección de depósito: " + direccionGenerada;
      return;
    }

    try {
      const res = await fetch("http://TU_IP_DEL_SERVIDOR:3000/api/deposit-address", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      });

      const data = await res.json();
      direccionGenerada = data.address;
      direccionDiv.textContent = "Dirección de depósito: " + direccionGenerada;
    } catch (err) {
      direccionDiv.textContent = "Error al obtener la dirección";
      console.error(err);
    }
  });
});
