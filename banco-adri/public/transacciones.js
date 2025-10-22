document.addEventListener("DOMContentLoaded", () => {
  const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
  const historial = JSON.parse(localStorage.getItem("historialTransacciones")) || [];

  if (!usuario) {
    alert("Debes iniciar sesión primero 💡");
    window.location.href = "login.html";
    return;
  }

  // Mostrar datos del usuario activo
  document.getElementById("nombreUsuario").textContent = usuario.nombre;
  document.getElementById("numeroCuenta").textContent = usuario.numeroCuenta || "Sin número";
  document.getElementById("saldoActual").textContent = usuario.saldo || "$0";

  // 🔍 Mostrar solo las transacciones de este usuario
  const tbody = document.getElementById("listaTransacciones");

  // El campo "usuario" en el historial puede ser el nombre o el correo, así que filtramos por ambos
  const movimientosUsuario = historial.filter(
    t => t.usuario === usuario.correo || t.usuario === usuario.nombre
  );

  if (movimientosUsuario.length === 0) {
    const fila = document.createElement("tr");
    const celda = document.createElement("td");
    celda.colSpan = 3;
    celda.textContent = "No hay movimientos registrados todavía 📭";
    fila.appendChild(celda);
    tbody.appendChild(fila);
  } else {
    movimientosUsuario.forEach(tx => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${tx.fecha}</td>
        <td>${tx.tipo}</td>
        <td>${tx.descripcion || ''}</td> 
        <td>$${Number(tx.monto).toLocaleString("es-CO")}</td>
      `;
      tbody.appendChild(fila);
    });
  }

  // 🔙 Botones
  document.getElementById("volverCuenta").addEventListener("click", () => {
    window.location.href = "cuenta.html";
  });

  document.getElementById("cerrarSesion").addEventListener("click", () => {
    localStorage.removeItem("usuarioActivo");
    alert("Sesión cerrada exitosamente 🌸");
    window.location.href = "login.html";
  });
});
