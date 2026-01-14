/*********************************
 * LOGIN
 * - Valida credenciales de prueba
 * - Si son correctas, redirige a menu.html
 * - Si son incorrectas, muestra mensaje de error
 *********************************/

document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();

  // Obtener valores del formulario
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  // Referencia al mensaje de error
  const errorMsg = document.getElementById("error");

  // Ocultar error antes de validar (por si el usuario reintenta)
  errorMsg.classList.add("d-none");

  // Credenciales de prueba
  const EMAIL_OK = "admin@admin.com";
  const PASS_OK = "1234";

  // Validación
  if (email === EMAIL_OK && password === PASS_OK) {
    window.location.href = "menu.html";
  } else {
    errorMsg.classList.remove("d-none");
  }
});
