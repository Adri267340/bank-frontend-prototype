document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (email === "" || password === "") {
    alert("Por favor, completa todos los campos antes de continuar 💡");
    return;
  }

  // Recuperar usuarios registrados
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  // Buscar coincidencia
  const usuario = usuarios.find(user => user.correo === email && user.password === password);

  if (usuario) {
    alert(`Inicio de sesión exitoso 🎉 Bienvenido/a ${usuario.nombre} 💖`);
    localStorage.setItem("usuarioActivo", JSON.stringify(usuario)); // Guarda sesión
    window.location.href = "index.html";
  } else {
    alert("Correo o contraseña incorrectos ❌");
  }
});

// Botón cancelar
document.getElementById("cancelar").addEventListener("click", function () {
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  alert("Campos limpiados 💨");
});
