document.addEventListener("DOMContentLoaded", () => {
  // 🧩 Traer usuario activo
  const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

  if (!usuario) {
    alert("Debes iniciar sesión primero 💡");
    window.location.href = "login.html";
    return;
  }

  // 🪙 Si no tiene saldo definido, inicializar a "$0"
  if (!usuario.saldo && usuario.saldo !== 0) {
    usuario.saldo = "$0";
  }

  // 🔗 Elementos del DOM
  const nombreEl = document.getElementById("nombreUsuario");
  const numeroCuentaEl = document.getElementById("numeroCuenta");
  const tipoCuentaEl = document.getElementById("tipoCuenta");
  const saldoCuentaEl = document.getElementById("saldoCuenta");

  // Mostrar datos en pantalla
  nombreEl.textContent = usuario.nombre || "";
  numeroCuentaEl.textContent = usuario.numeroCuenta || "";
  tipoCuentaEl.textContent = usuario.tipoCuenta || "";
  saldoCuentaEl.textContent = usuario.saldo;

  // ---------- ⚙️ FUNCIONES AUXILIARES ----------

  // Formatea número a dinero colombiano: 2350000 -> "$2.350.000"
  function formatMoney(n) {
    return `$${Number(n).toLocaleString("es-CO")}`;
  }

  // Limpia texto del saldo y devuelve número
  function limpiarSaldo(saldo) {
    if (saldo === undefined || saldo === null) return 0;
    const soloDigitos = saldo.toString().replace(/[^\d]/g, "");
    const num = parseFloat(soloDigitos);
    return isNaN(num) ? 0 : num;
  }

  // Guarda cambios del usuario activo y sincroniza con la lista "usuarios"
  function guardarUsuarioActivo() {
    localStorage.setItem("usuarioActivo", JSON.stringify(usuario));

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const idx = usuarios.findIndex(u => u.correo === usuario.correo);
    if (idx !== -1) {
      usuarios[idx] = usuario;
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }
  }

  // Guarda una transacción en historialTransacciones
  function guardarTransaccion(tipo, monto) {
    const historial = JSON.parse(localStorage.getItem("historialTransacciones")) || [];
    const trans = {
      fecha: new Date().toISOString().split("T")[0],
      tipo,
      monto,
      usuario: usuario.correo || usuario.nombre
    };
    historial.push(trans);
    localStorage.setItem("historialTransacciones", JSON.stringify(historial));
  }

  // ---------- 💰 DEPÓSITO CON AWAIT ----------  
const btnDepositar = document.getElementById("depositar");
if (btnDepositar) {
  btnDepositar.addEventListener("click", async () => {
    const monto = parseFloat(prompt("Ingrese el monto a depositar 💰:"));
    if (isNaN(monto) || monto <= 0) {
      alert("Por favor, ingresa un monto válido 💡");
      return;
    }

    // 🧠 Simular una espera de 2 segundos como si fuera una llamada al backend
    alert("Procesando depósito... ⏳");
    await new Promise(resolve => setTimeout(resolve, 2000));

    // ✅ Continuar después del "await"
    let saldoActual = limpiarSaldo(usuario.saldo);
    saldoActual += monto;

    usuario.saldo = formatMoney(saldoActual);
    guardarUsuarioActivo();
    saldoCuentaEl.textContent = usuario.saldo;

    guardarTransaccion("Depósito", monto);

    alert(`Depósito exitoso de ${formatMoney(monto)} 💵`);
  });
}


  // ---------- 💸 RETIRO CON AWAIT ----------  
const btnRetirar = document.getElementById("retirar");
if (btnRetirar) {
  btnRetirar.addEventListener("click", async () => {
    const monto = parseFloat(prompt("Ingrese el monto a retirar 💸:"));
    if (isNaN(monto) || monto <= 0) {
      alert("Por favor, ingresa un monto válido 💡");
      return;
    }

    let saldoActual = limpiarSaldo(usuario.saldo);
    if (monto > saldoActual) {
      alert("Saldo insuficiente ❌ No puedes retirar más de lo que tienes.");
      return;
    }

    // 🧠 Simular una espera de 2 segundos como si fuera una llamada al backend
    alert("Procesando retiro... ⏳");
    await new Promise(resolve => setTimeout(resolve, 2000));

    // ✅ Después de la espera, continuar el proceso
    saldoActual -= monto;
    usuario.saldo = formatMoney(saldoActual);
    guardarUsuarioActivo();
    saldoCuentaEl.textContent = usuario.saldo;

    guardarTransaccion("Retiro", monto);

    alert(`Retiro exitoso de ${formatMoney(monto)} 🏧`);
  });
}


  // ---------- 📋 VER MOVIMIENTOS ----------
  const btnVer = document.getElementById("verMovimientos");
  if (btnVer) {
    btnVer.addEventListener("click", () => {
      window.location.href = "transacciones.html";
    });
  }

  // ---------- 🚪 CERRAR SESIÓN ----------
  const btnCerrar = document.getElementById("cerrarSesion");
  if (btnCerrar) {
    btnCerrar.addEventListener("click", () => {
      localStorage.removeItem("usuarioActivo");
      alert("Sesión cerrada exitosamente 🌸");
      window.location.href = "login.html";
    });
  }

 // ---------- AGREGAR MOVIMIENTO MANUAL ----------
const btnAgregar = document.getElementById("agregarMovimiento");
if (btnAgregar) {
  btnAgregar.addEventListener("click", () => {
    const descripcion = prompt("Descripción del movimiento ✏️ (ej: Pago de servicios):");
    if (!descripcion || descripcion.trim() === "") {
      alert("Debes ingresar una descripción válida 💡");
      return;
    }

    const monto = parseFloat(prompt("Monto del movimiento 💰 (usa números sin símbolos):"));
    if (isNaN(monto) || monto <= 0) {
      alert("Por favor, ingresa un monto válido 💡");
      return;
    }

    // 🔹 Obtener el saldo actual
    let saldoActual = limpiarSaldo(usuario.saldo);

    // 🔹 Verificar si tiene saldo suficiente
    if (monto > saldoActual) {
      alert("Saldo insuficiente ❌ No puedes registrar un pago mayor al saldo actual.");
      return;
    }

    // 🔹 Descontar el monto del saldo
    saldoActual -= monto;
    usuario.saldo = formatMoney(saldoActual);

    // 🔹 Guardar cambios en usuario activo y lista
    guardarUsuarioActivo();

    // 🔹 Actualizar saldo visible en pantalla
    saldoCuentaEl.textContent = usuario.saldo;

    // 🔹 Guardar en historial
    const historial = JSON.parse(localStorage.getItem("historialTransacciones")) || [];
    const nuevaTransaccion = {
      usuario: usuario.nombre,
      fecha: new Date().toISOString().split("T")[0],
      tipo: "Pago manual",
      descripcion: descripcion.trim(),
      monto: monto
    };
    historial.push(nuevaTransaccion);
    localStorage.setItem("historialTransacciones", JSON.stringify(historial));

    alert(`Pago manual agregado: ${descripcion} por ${formatMoney(monto)} ✅`);
  });
}

  // ---------- 🕓 EJEMPLOS DE ASINCRONÍA Y AWAIT ----------

  // 🧠 Ejemplo 1: Simular esperar una respuesta del servidor al cargar saldo
  async function obtenerSaldoDesdeServidor() {
    console.log("⏳ Consultando saldo en el servidor...");
    return new Promise((resolve) => {
      setTimeout(() => {
        const saldoServidor = limpiarSaldo(usuario.saldo);
        resolve(saldoServidor);
      }, 2000); // Simula 2 segundos de espera
    });
  }

  // Llamamos a la función cuando carga la página
  (async () => {
    const saldo = await obtenerSaldoDesdeServidor();
    console.log(`✅ Saldo recibido del servidor: ${formatMoney(saldo)}`);
  })();

  // 🧠 Ejemplo 2: Simular un depósito que tarda un poco (usando await)
  async function simularDepositoAsync(monto) {
    console.log(`💰 Procesando depósito de ${formatMoney(monto)}...`);
    return new Promise((resolve) => {
      setTimeout(() => {
        let saldoActual = limpiarSaldo(usuario.saldo);
        saldoActual += monto;
        usuario.saldo = formatMoney(saldoActual);
        guardarUsuarioActivo();
        saldoCuentaEl.textContent = usuario.saldo;
        resolve(`Depósito completado de ${formatMoney(monto)} ✅`);
      }, 3000); // Simula 3 segundos de espera
    });
  }

  // 🧠 Ejemplo 3: Usar fetch con await (si tuvieras una API real)
  async function obtenerCuentas() {
    try {
      const respuesta = await fetch("http://localhost:8080/api/cuentas");
      if (!respuesta.ok) throw new Error("Error al obtener cuentas");
      const cuentas = await respuesta.json();
      console.log("📦 Cuentas del servidor:", cuentas);
    } catch (error) {
      console.error("❌ Error:", error.message);
    }
  }

  // 🔹 Llamar esta función si quieres probar la conexión real
  // obtenerCuentas();


});
