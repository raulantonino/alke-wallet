/*********************************
 * ENVIAR DINERO
 * - Muestra saldo desde localStorage ("saldo")
 * - Autocomplete de contactos (lista ficticia)
 * - Permite "agregar contacto" con prompt
 * - Resta saldo y guarda transacción en "transacciones"
 *********************************/

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
 * DOM (elementos de la página)
 *********************************/
const searchInput = document.getElementById("searchContact");
const contactsList = document.getElementById("contactsList");
const amountInput = document.getElementById("amount");
const sendButton = document.getElementById("sendMoneyBtn");
const balanceSpan = document.getElementById("balance");
const addContactBtn = document.getElementById("btnAddContactCard");

/*********************************
 * ESTADO (variables de apoyo)
 *********************************/
let selectedContact = null;

/*********************************
 * FUNCIONES
 *********************************/

// Mostrar saldo desde localStorage
function loadBalance() {
  const saldo = Number(localStorage.getItem("saldo")) || 0;
  balanceSpan.textContent = `$ ${saldo.toLocaleString("es-CL")}`;
}

// Renderizar lista de contactos
function renderContacts(list) {
  contactsList.innerHTML = "";

  if (list.length === 0) {
    contactsList.innerHTML =
      `<li class="list-group-item text-muted">Sin resultados</li>`;
    return;
  }

  list.forEach((contact) => {
    const li = document.createElement("li");
    li.className = "list-group-item list-group-item-action";
    li.textContent = contact.name;

    // Seleccionar contacto desde la lista
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

// Buscar contacto (filtra mientras escribes)
searchInput.addEventListener("keyup", () => {
  const value = searchInput.value.toLowerCase();

  // Si el usuario vuelve a escribir, obligamos a seleccionar de nuevo
  selectedContact = null;

  const filtered = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(value)
  );

  renderContacts(filtered);
});

// Enviar dinero (simulado)
sendButton.addEventListener("click", () => {
  const amount = Number(amountInput.value);
  const saldo = Number(localStorage.getItem("saldo")) || 0;

  // Validaciones
  if (!selectedContact) {
    alert("Selecciona un contacto");
    return;
  }

  if (!amount || amount <= 0) {
    alert("Ingresa un monto válido");
    return;
  }

  if (amount > saldo) {
    alert("Saldo insuficiente");
    return;
  }

  // Confirmación
  const confirmSend = confirm(
    `¿Seguro que deseas enviar $${amount.toLocaleString("es-CL")} a ${selectedContact.name}?`
  );
  if (!confirmSend) return;

  // Actualizar saldo
  const newBalance = saldo - amount;
  localStorage.setItem("saldo", newBalance);

  // Guardar transacción (historial)
  const transacciones = JSON.parse(localStorage.getItem("transacciones")) || [];
  transacciones.unshift({
    tipo: "Envío",
    monto: amount,
    detalle: `Envío a ${selectedContact.name}`,
    fecha: new Date().toLocaleString("es-CL", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    })
  });
  localStorage.setItem("transacciones", JSON.stringify(transacciones));

  // Limpiar / actualizar UI
  loadBalance();
  amountInput.value = "";
  alert("Dinero enviado correctamente");
});

// Agregar contacto (rápido) con prompt
addContactBtn.addEventListener("click", () => {
  const nombre = prompt("Nombre del nuevo contacto:");
  if (!nombre) return;

  const limpio = nombre.trim();
  if (!limpio) return;

  // Evitar duplicados
  const existe = contacts.some(
    (c) => c.name.toLowerCase() === limpio.toLowerCase()
  );

  if (existe) {
    alert("Ese contacto ya existe");
    return;
  }

  contacts.unshift({ name: limpio });
  renderContacts(contacts);
});

/*********************************
 * INICIO
 *********************************/
loadBalance();
renderContacts(contacts);
