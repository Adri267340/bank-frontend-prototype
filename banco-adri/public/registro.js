document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registroForm");
  const cancelarBtn = document.getElementById("cancelarRegistro");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmar = document.getElementById("confirmar").value.trim();

    if (!nombre || !correo || !password || !confirmar) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    if (password !== confirmar) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const existe = usuarios.find((u) => u.correo === correo);
    if (existe) {
      alert("Este correo ya está registrado.");
      return;
    }

    const nuevoUsuario = {
      nombre,
      correo,
      password,
      numeroCuenta: Date.now(), // número único generado automáticamente
      tipoCuenta: "Ahorros",
      saldo: "$0" // saldo inicial
    };

    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("¡Registro exitoso! 🎉 Ahora puedes iniciar sesión.");
    window.location.href = "login.html";
  });

  cancelarBtn.addEventListener("click", () => {
    form.reset();
    alert("Formulario limpiado.");
  });
});
