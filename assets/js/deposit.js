document.addEventListener("DOMContentLoaded", () => {
    const saldoTexto = document.getElementById("saldo-deposito");
    const saldo = Number(localStorage.getItem("saldo"));

    if (saldoTexto) {
        saldoTexto.textContent = `$ ${saldo.toLocaleString("es-CL")}`;
    }
});

function confirmarDeposito() {
    const inputAmount = document.getElementById("amount");
    const monto = Number(inputAmount.value);
    let saldo = Number(localStorage.getItem("saldo"));

    if (!monto || monto <= 0) {
        alert("Ingresa un monto válido");
        return false;
    }

    const confirmar = confirm(
        `¿Estás seguro que deseas depositar $${monto.toLocaleString("es-CL")}?`
    );

    if (!confirmar) {
        return false;
    }

    saldo += monto;
    localStorage.setItem("saldo", saldo);

    // Guardar transacción
    const transacciones = JSON.parse(localStorage.getItem("transacciones")) || [];
    transacciones.unshift({
     tipo: "Depósito",
    monto: monto,
    detalle: "Depósito a la cuenta",
    fecha: new Date().toLocaleString("es-CL", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
    })
    });
    localStorage.setItem("transacciones", JSON.stringify(transacciones));


    alert("Depósito realizado con éxito");

    // limpiar input
    inputAmount.value = "";

    // actualizar saldo en pantalla
    const saldoTexto = document.getElementById("saldo-deposito");
    saldoTexto.textContent = `$ ${saldo.toLocaleString("es-CL")}`;

    return false;
}
