/*********************************
 * MOVIMIENTOS (jQuery)
 * - Lee saldo desde localStorage ("saldo")
 * - Lee historial desde localStorage ("transacciones")
 * - Filtra por tipo (Todos / Depósito / Retiro / Envío)
 * - Permite borrar historial
 *********************************/

$(document).ready(function () {
  /*********************************
   * SALDO (header)
   *********************************/
  const saldo = Number(localStorage.getItem("saldo")) || 0;
  $("#saldo-movs").text(`$ ${saldo.toLocaleString("es-CL")}`);

  /*********************************
   * Helpers: icono, color y signo según tipo
   *********************************/
  function iconoPorTipo(tipo) {
    if (tipo === "Depósito") return "bi-plus-circle";
    if (tipo === "Retiro") return "bi-dash-circle";
    return "bi-arrow-up-right-circle"; // Envío (por defecto)
  }

  function claseMonto(tipo) {
    return (tipo === "Depósito") ? "text-success" : "text-danger";
  }

  function signoPorTipo(tipo) {
    return (tipo === "Depósito") ? "+" : "-";
  }

  /*********************************
   * Render: cargar y mostrar movimientos
   *********************************/
  function cargarMovimientos() {
    const tipoSeleccionado = $("#filtroTipo").val();
    const transacciones = JSON.parse(localStorage.getItem("transacciones")) || [];

    const filtradas = (tipoSeleccionado === "Todos")
      ? transacciones
      : transacciones.filter((t) => t.tipo === tipoSeleccionado);

    $("#listaMovs").empty();

    // Estado vacío
    if (filtradas.length === 0) {
      $("#sinMovs").removeClass("d-none");
      return;
    }
    $("#sinMovs").addClass("d-none");

    // Render de cada movimiento
    filtradas.forEach((t) => {
      const monto = Number(t.monto);
      const icono = iconoPorTipo(t.tipo);
      const clase = claseMonto(t.tipo);
      const signo = signoPorTipo(t.tipo);

      const item = `
        <li class="list-group-item py-3">
          <div class="d-flex justify-content-between align-items-start flex-wrap gap-2">
            <div class="d-flex gap-3 align-items-center flex-grow-1">
              <i class="bi ${icono} fs-4 text-primary" aria-hidden="true"></i>

              <div class="min-w-0">
                <div class="fw-semibold text-truncate">${t.detalle}</div>
                <div class="text-muted small">${t.fecha}</div>
              </div>
            </div>

            <div class="fw-bold ${clase} text-nowrap ms-auto">
              ${signo}$ ${monto.toLocaleString("es-CL")}
            </div>
          </div>
        </li>
      `;

      $("#listaMovs").append(item);
    });
  }

  /*********************************
   * EVENTOS
   *********************************/
  $("#filtroTipo").on("change", cargarMovimientos);

  $("#btnLimpiar").on("click", function () {
    const ok = confirm("¿Seguro que deseas borrar el historial?");
    if (!ok) return;

    localStorage.removeItem("transacciones");
    cargarMovimientos();
  });

  /*********************************
   * INICIO
   *********************************/
  cargarMovimientos();
});
