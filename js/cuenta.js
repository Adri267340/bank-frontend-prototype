// Aquí pouedo recibir datos reales de la API.
// Por ahora simulo los datos del usuario logueado.

document.addEventListener("DOMContentLoaded", () => {
  const usuario = {
    nombre: "Adri",
    numeroCuenta: "12345",
    tipoCuenta: "Ahorros",
    saldo: "$2.350.000"
  };

  document.getElementById("nombreUsuario").textContent = usuario.nombre;
  document.getElementById("numeroCuenta").textContent = usuario.numeroCuenta;
  document.getElementById("tipoCuenta").textContent = usuario.tipoCuenta;
  document.getElementById("saldoCuenta").textContent = usuario.saldo;
});

document.getElementById("verMovimientos").addEventListener("click", () => {
  window.location.href = "transacciones.html";
});

document.getElementById("cerrarSesion").addEventListener("click", () => {
  alert("Sesión cerrada exitosamente 🌸");
  window.location.href = "index.html";
});
