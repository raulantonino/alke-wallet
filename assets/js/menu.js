/*********************************
 * MENÚ PRINCIPAL
 * - Inicializa saldo si no existe en localStorage
 * - Muestra el saldo en pantalla
 *********************************/

document.addEventListener("DOMContentLoaded", () => {
  /*********************************
   * 1) Inicializar saldo (solo la primera vez)
   *********************************/
  if (!localStorage.getItem("saldo")) {
    localStorage.setItem("saldo", 150000);
  }

  /*********************************
   * 2) Mostrar saldo en el menú
   *********************************/
  const saldoMenu = document.getElementById("saldo-menu");
  const saldo = Number(localStorage.getItem("saldo")) || 0;

  if (saldoMenu) {
    saldoMenu.textContent = `$ ${saldo.toLocaleString("es-CL")}`;
  }
});
