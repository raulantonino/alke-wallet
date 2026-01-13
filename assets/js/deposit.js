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

    alert("Depósito realizado con éxito");

    // limpiar input
    inputAmount.value = "";

    // actualizar saldo en pantalla
    const saldoTexto = document.getElementById("saldo-deposito");
    saldoTexto.textContent = `$ ${saldo.toLocaleString("es-CL")}`;

    return false;
}
