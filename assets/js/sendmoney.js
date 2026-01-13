/*********************************
 * DATOS (contactos ficticios)
 *********************************/
const contacts = [
  { name: "Juan Pérez" },
  { name: "María Soto" },
  { name: "Carlos Díaz" },
  { name: "Ana Rojas" },
  { name: "Pedro González" }
];

/*********************************
 * VARIABLES DEL DOM
 *********************************/
const searchInput = document.getElementById("searchContact");
const contactsList = document.getElementById("contactsList");
const amountInput = document.getElementById("amount");
const sendButton = document.getElementById("sendMoneyBtn");
const balanceSpan = document.getElementById("balance");

let selectedContact = null;

/*********************************
 * FUNCIONES
 *********************************/

// Mostrar saldo desde localStorage
function loadBalance() {
  const balance = localStorage.getItem("saldo") || 0;
  balanceSpan.textContent = `$${Number(balance).toLocaleString("es-CL")}`;
}

// Renderizar lista de contactos
function renderContacts(list) {
  contactsList.innerHTML = "";

  if (list.length === 0) {
    contactsList.innerHTML =
      `<li class="list-group-item text-muted">Sin resultados</li>`;
    return;
  }

  list.forEach(contact => {
    const li = document.createElement("li");
    li.className = "list-group-item list-group-item-action";
    li.textContent = contact.name;

    li.addEventListener("click", () => {
      selectedContact = contact;
      searchInput.value = contact.name;
      contactsList.innerHTML = "";
    });

    contactsList.appendChild(li);
  });
}

/*********************************
 * EVENTOS
 *********************************/

// Buscar contacto
searchInput.addEventListener("keyup", () => {
  const value = searchInput.value.toLowerCase();
  const filtered = contacts.filter(contact =>
    contact.name.toLowerCase().includes(value)
  );
  renderContacts(filtered);
});

// Enviar dinero (simulado)
sendButton.addEventListener("click", () => {
  const amount = Number(amountInput.value);
  const balance = Number(localStorage.getItem("saldo")) || 0;

  if (!selectedContact) {
    alert("Selecciona un contacto");
    return;
  }

  if (!amount || amount <= 0) {
    alert("Ingresa un monto válido");
    return;
  }

  if (amount > balance) {
    alert("Saldo insuficiente");
    return;
  }

  const confirmSend = confirm(
    `¿Seguro que deseas enviar $${amount.toLocaleString("es-CL")} a ${selectedContact.name}?`
  );

  if (!confirmSend) return;

  const newBalance = balance - amount;
  localStorage.setItem("saldo", newBalance);

  loadBalance();
  amountInput.value = "";
  alert("Dinero enviado correctamente");
});

/*********************************
 * INICIO
 *********************************/
loadBalance();
renderContacts(contacts);
