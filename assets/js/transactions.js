$(document).ready(function () {
  const saldo = Number(localStorage.getItem("saldo")) || 0;
  $("#saldo-movs").text(`$ ${saldo.toLocaleString("es-CL")}`);

  function iconoPorTipo(tipo) {
    return (tipo === "Depósito") ? "bi-plus-circle" : "bi-arrow-up-right-circle";
  }

  function claseMonto(tipo) {
    return (tipo === "Depósito") ? "text-success" : "text-danger";
  }

  function cargarMovimientos() {
    const tipo = $("#filtroTipo").val();
    const transacciones = JSON.parse(localStorage.getItem("transacciones")) || [];

    const filtradas = (tipo === "Todos")
      ? transacciones
      : transacciones.filter(t => t.tipo === tipo);

    $("#listaMovs").empty();

    if (filtradas.length === 0) {
      $("#sinMovs").removeClass("d-none");
      return;
    }

    $("#sinMovs").addClass("d-none");

    filtradas.forEach(t => {
      const monto = Number(t.monto);
      const montoFormateado = `$ ${monto.toLocaleString("es-CL")}`;
      const icono = iconoPorTipo(t.tipo);
      const clase = claseMonto(t.tipo);

     const item = `
        <li class="list-group-item py-3">
            <div class="d-flex justify-content-between align-items-start flex-wrap gap-2">
            <div class="d-flex gap-3 align-items-center flex-grow-1">
                <i class="bi ${icono} fs-4 text-primary"></i>
                <div class="min-w-0">
                <div class="fw-semibold text-truncate">${t.detalle}</div>
                <div class="text-muted small">${t.fecha}</div>
                </div>
            </div>

            <div class="fw-bold ${clase} text-nowrap ms-auto">
                ${t.tipo === "Depósito" ? "+" : "-"}$ ${monto.toLocaleString("es-CL")}
            </div>
            </div>
        </li>
     `;



      $("#listaMovs").append(item);
    });
  }

  $("#filtroTipo").on("change", cargarMovimientos);

  $("#btnLimpiar").on("click", function () {
    const ok = confirm("¿Seguro que deseas borrar el historial?");
    if (!ok) return;

    localStorage.removeItem("transacciones");
    cargarMovimientos();
  });

  cargarMovimientos();
});
