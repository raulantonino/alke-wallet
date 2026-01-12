document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email === "admin@admin.com" && password === "1234") {
        window.location.href = "menu.html";
    } else {
        document.getElementById("error").style.display = "block";
    }
});
