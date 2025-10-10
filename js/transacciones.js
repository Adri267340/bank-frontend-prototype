document.addEventListener("DOMContentLoaded", () => {
  // Simulando datos que vendrían de la API
  const cuenta = {
    numeroCuenta: "12345",
    saldo: "$2.350.000",
    transacciones: [
      { fecha: "2025-10-01", tipo: "Depósito", monto: "$500.000", descripcion: "Ahorro mensual" },
      { fecha: "2025-10-03", tipo: "Transferencia", monto: "$200.000", descripcion: "Pago servicios" },
      { fecha: "2025-10-05", tipo: "Retiro", monto: "$100.000", descripcion: "Cajero automático" },
      { fecha: "2025-10-08", tipo: "Depósito", monto: "$300.000", descripcion: "Salario" }
    ]
  };

  // Mostrar datos en pantalla
  document.getElementById("numeroCuenta").textContent = cuenta.numeroCuenta;
  document.getElementById("saldoActual").textContent = cuenta.saldo;

  // Rellenar tabla
  const tbody = document.getElementById("listaTransacciones");
  cuenta.transacciones.forEach(tx => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${tx.fecha}</td>
      <td>${tx.tipo}</td>
      <td>${tx.monto}</td>
      <td>${tx.descripcion}</td>
    `;
    tbody.appendChild(fila);
  });
});

// Botones
document.getElementById("volverCuenta").addEventListener("click", () => {
  window.location.href = "cuenta.html";
});

document.getElementById("cerrarSesion").addEventListener("click", () => {
  alert("Sesión cerrada exitosamente 🌸");
  window.location.href = "index.html";
});
