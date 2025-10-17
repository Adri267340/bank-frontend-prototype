import { Router } from "express";
import axios from "axios";

const router = Router();
const API_BASE_URL = "http://localhost:8080/api/transacciones"; // Backend Java

// 🔹 Listar transacciones de una cuenta específica
router.get("/cuenta/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(`${API_BASE_URL}/cuenta/${id}`);
    res.render("transacciones", {
      title: `Transacciones de la cuenta #${id}`,
      transacciones: response.data,
      error: null,
      cuentaId: id,
    });
  } catch (error) {
    console.error("❌ Error al obtener transacciones:", error);
    res.render("transacciones", {
      title: "Error al listar transacciones",
      transacciones: [],
      error: "No se pudieron cargar las transacciones de esta cuenta 😢",
      cuentaId: id,
    });
  }
});

// 🔹 Crear nueva transacción (depósito o retiro)
router.post("/crear", async (req, res) => {
  const { cuentaId, tipo, monto } = req.body;

  try {
    await axios.post(API_BASE_URL, {
      cuentaId: Number(cuentaId),
      tipo,
      monto: Number(monto),
    });

    // Después de crearla, volvemos al historial de esa cuenta
    res.redirect(`/transacciones/cuenta/${cuentaId}`);
  } catch (error) {
    console.error("❌ Error al crear transacción:", error);
    res.render("transacciones", {
      title: "Error al crear transacción",
      transacciones: [],
      error: "Ocurrió un error al registrar la transacción 💔",
      cuentaId,
    });
  }
});

export default router;
