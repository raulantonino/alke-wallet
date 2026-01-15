# Alke Wallet — Proyecto Frontend

Repositorio correspondiente a mi entrega del módulo de Frontend del curso **Desarrollo de Aplicaciones Fullstack Python Trainee**.

El objetivo del proyecto es practicar fundamentos de **HTML**, **CSS**, **Bootstrap**, **JavaScript**, **JQuery** y el flujo de trabajo con **Git/GitHub**.

El proyecto no incluye backend ni base de datos: el comportamiento es una simulación y el estado se guarda en el navegador.

---

## Ejecución
- Abrir `index.html` en el navegador.  

### Credenciales de prueba
- Email: `admin@admin.com`
- Contraseña: `1234`

---

## Funcionalidades implementadas
- Login con validación básica.
- Menú principal con saldo disponible.
- Depósitos y retiros (actualiza el saldo).
- Envío de dinero a contactos (búsqueda + opción de agregar contacto).
- Movimientos: registro de transacciones con filtro por tipo y opción de borrar historial.

## Persistencia (simulación)
Se utiliza `localStorage` para almacenar:
- `saldo`
- `transacciones`

---

## Estructura del proyecto
```text
alke-wallet/
├─ index.html            # Login
├─ menu.html             # Menú principal
├─ deposit.html          # Depósitos y retiros
├─ sendmoney.html        # Enviar dinero
├─ transactions.html     # Movimientos
└─ assets/
   ├─ css/
   │  └─ main.css        # Estilos propios
   └─ js/
      ├─ login.js
      ├─ menu.js
      ├─ deposit.js
      ├─ sendmoney.js
      └─ transactions.js
```
Autor: Raúl Ortega
