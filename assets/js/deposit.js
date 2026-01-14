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
     const tipo = document.getElementById("tipoMovimiento").value; // "Deposito" o "Retiro"


    if (!monto || monto <= 0) {
        alert("Ingresa un monto válido");
        return false;
    }

    if (tipo === "Retiro" && monto > saldo) {
        alert("Saldo insuficiente para retirar");
        return false;
    }


    const accionTexto = (tipo === "Retiro") ? "retirar" : "depositar";

    const confirmar = confirm(
        `¿Estás seguro que deseas ${accionTexto} $${monto.toLocaleString("es-CL")}?`
    );

    if (!confirmar) {
        return false;
    }

    if (tipo === "Retiro") {
        saldo -= monto;
    } else {
        saldo += monto;
    }
    localStorage.setItem("saldo", saldo);

    // Guardar transacción (historial)
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



    alert(tipo === "Retiro" ? "Retiro realizado con éxito" : "Depósito realizado con éxito");

    // limpiar input
    inputAmount.value = "";

    // actualizar saldo en pantalla
    const saldoTexto = document.getElementById("saldo-deposito");
    saldoTexto.textContent = `$ ${saldo.toLocaleString("es-CL")}`;

    return false;
}
