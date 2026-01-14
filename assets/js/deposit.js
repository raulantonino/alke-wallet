/*********************************
 * DEPÓSITOS Y RETIROS
 * - Lee y muestra saldo desde localStorage ("saldo")
 * - Permite depósito o retiro (según selector)
 * - Guarda el movimiento en historial ("transacciones")
 *********************************/

/*********************************
 * INICIO: Mostrar saldo al cargar
 *********************************/
document.addEventListener("DOMContentLoaded", () => {
  const saldoTexto = document.getElementById("saldo-deposito");
  const saldo = Number(localStorage.getItem("saldo")) || 0;

  if (saldoTexto) {
    saldoTexto.textContent = `$ ${saldo.toLocaleString("es-CL")}`;
  }
});

/*********************************
 * FUNCIÓN PRINCIPAL: confirmar movimiento
 * (Se llama desde el atributo onsubmit del formulario)
 *********************************/
function confirmarDeposito() {
  // === DOM ===
  const inputAmount = document.getElementById("amount");
  const tipo = document.getElementById("tipoMovimiento").value; // "Deposito" o "Retiro"

  // === Datos ===
  const monto = Number(inputAmount.value);
  let saldo = Number(localStorage.getItem("saldo")) || 0;

  // === Validaciones ===
  if (!monto || monto <= 0) {
    alert("Ingresa un monto válido");
    return false;
  }

  if (tipo === "Retiro" && monto > saldo) {
    alert("Saldo insuficiente para retirar");
    return false;
  }

  // === Confirmación ===
  const accionTexto = (tipo === "Retiro") ? "retirar" : "depositar";
  const confirmar = confirm(
    `¿Estás seguro que deseas ${accionTexto} $${monto.toLocaleString("es-CL")}?`
  );

  if (!confirmar) {
    return false;
  }

  // === Actualizar saldo ===
  if (tipo === "Retiro") {
    saldo -= monto;
  } else {
    saldo += monto;
  }

  localStorage.setItem("saldo", saldo);

  // === Guardar transacción (historial) ===
  const transacciones = JSON.parse(localStorage.getItem("transacciones")) || [];
  transacciones.unshift({
    tipo: (tipo === "Retiro") ? "Retiro" : "Depósito",
    monto: monto,
    detalle: (tipo === "Retiro") ? "Retiro de fondos" : "Depósito a la cuenta",
    fecha: new Date().toLocaleString("es-CL", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    })
  });
  localStorage.setItem("transacciones", JSON.stringify(transacciones));

  // === Feedback + UI ===
  alert(tipo === "Retiro" ? "Retiro realizado con éxito" : "Depósito realizado con éxito");

  inputAmount.value = "";

  const saldoTexto = document.getElementById("saldo-deposito");
  if (saldoTexto) {
    saldoTexto.textContent = `$ ${saldo.toLocaleString("es-CL")}`;
  }

  // Evita que el formulario recargue la página
  return false;
}
