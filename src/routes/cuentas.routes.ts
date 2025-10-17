import express from "express";
import {
  listarCuentas,
  crearCuenta,
  obtenerCuenta,
  actualizarCuenta,
} from "../services/cuentas";

const router = express.Router();

// Middleware para asegurar que title siempre exista
router.use((req, res, next) => {
  res.locals.title = "Banco Adri"; // título por defecto
  next();
});

// 🧾 Listar cuentas
router.get("/", async (req, res) => {
  try {
    const cuentas = await listarCuentas();
    res.render("cuentas", {
      title: "Gestión de Cuentas - Banco Adri",
      cuentas,
      error: null,
    });
  } catch (error) {
    console.error("❌ Error al listar cuentas:", error);
    res.render("cuentas", {
      title: "Error - Banco Adri",
      cuentas: [],
      error: "Error al listar las cuentas",
    });
  }
});

// 📝 Formulario nueva cuenta
router.get("/crear", (req, res) => {
  res.render("nuevacuenta", { 
    title: "Crear Nueva Cuenta - Banco Adri", 
    error: null,
    cuenta: {} // datos vacíos para el formulario
  });
});

// ➕ Crear nueva cuenta
router.post("/crear", async (req, res) => {
  try {
    console.log("📥 Datos recibidos del formulario:", req.body);
    const { usuarioId, tipoCuenta, saldoInicial } = req.body;

    if (!usuarioId || !tipoCuenta || !saldoInicial) {
      return res.render("nuevacuenta", {
        title: "Crear Nueva Cuenta - Banco Adri",
        error: "Todos los campos son obligatorios",
        cuenta: req.body // mantener datos ingresados
      });
    }

    await crearCuenta({
      usuarioId: Number(usuarioId),
      tipoCuenta,
      saldoInicial: Number(saldoInicial),
    });

    res.redirect("/cuentas");
  } catch (error: any) {
    console.error("❌ Error al crear cuenta:", error);
    res.render("nuevacuenta", {
      title: "Error al crear cuenta - Banco Adri",
      error: error.message || "Error al crear la cuenta",
      cuenta: req.body // mantener datos ingresados
    });
  }
});

// 🔍 Detalle de cuenta
router.get("/:id", async (req, res) => {
  try {
    const cuenta = await obtenerCuenta(Number(req.params.id));
    res.render("detalleCuenta", {
      title: `Detalle de la Cuenta #${req.params.id} - Banco Adri`,
      cuenta,
      error: null,
    });
  } catch (error) {
    console.error("❌ Error al obtener detalle:", error);
    res.render("detalleCuenta", {
      title: "Error - Banco Adri",
      cuenta: null,
      error: "No se pudo obtener la cuenta",
    });
  }
});

// ✏️ Actualizar cuenta
router.post("/:id/actualizar", async (req, res) => {
  try {
    const id = Number(req.params.id);
    await actualizarCuenta(id, req.body);
    res.redirect(`/cuentas/${id}`);
  } catch (error: any) {
    console.error("❌ Error al actualizar cuenta:", error);
    res.render("detalleCuenta", {
      title: "Error - Banco Adri",
      cuenta: null,
      error: error.message || "Error al actualizar la cuenta"
    });
  }
});

export default router;
