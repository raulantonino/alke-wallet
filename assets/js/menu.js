document.addEventListener("DOMContentLoaded", () => {
    if (!localStorage.getItem("saldo")) {
        localStorage.setItem("saldo", 150000);
    }

    const saldoMenu = document.getElementById("saldo-menu");
    const saldo = Number(localStorage.getItem("saldo"));

    if (saldoMenu) {
        saldoMenu.textContent = `$ ${saldo.toLocaleString("es-CL")}`;
    }
});