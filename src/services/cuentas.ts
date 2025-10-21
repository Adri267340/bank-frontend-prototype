import axios from "axios";

const API_URL = "http://localhost:8080/api/cuentas"; // URL del backend Spring Boot

// Interfaces para TypeScript
interface CuentaRequest {
  usuarioId: number;
  tipoCuenta: "AHORRO" | "CORRIENTE";
  saldoInicial: number;
}

interface CuentaResponse {
  id: number;
  numeroCuenta: string;
  usuarioId: number;
  tipoCuenta: string;
  saldo: number;
}

// 📋 Listar todas las cuentas

export async function listarCuentas() {
  const response = await axios.get(API_URL);
  return response.data;
}

export async function obtenerCuenta(id: number) {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
}

export async function crearCuenta(cuenta: CuentaRequest): Promise<CuentaResponse> {
  try {
    console.log("📤 Enviando cuenta al backend:", {
      url: API_URL,
      payload: cuenta
    });

    const response = await axios.post<CuentaResponse>(API_URL, cuenta, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log("✅ Respuesta del backend:", {
      status: response.status,
      data: response.data
    });

    return response.data;
  } catch (error: any) {
    console.error("❌ Error creando cuenta:", {
      mensaje: error.message,
      detalles: error.response?.data
    });
    throw new Error(error.response?.data?.message || 'Error al crear la cuenta');
  }
}

export async function actualizarCuenta(id: number, cuenta: any) {
  const response = await axios.delete(`${API_URL}/${id}`, cuenta);
  return response.data;
}

// 🗑️ Eliminar cuenta por ID
export async function eliminarCuenta(id: number): Promise<void> {
  try {
    console.log(`🗑️ Eliminando cuenta con ID: ${id}`);
    const response = await axios.delete(`${API_URL}/${id}`);
    console.log("✅ Cuenta eliminada correctamente:", response.status);
  } catch (error: any) {
    console.error("❌ Error al eliminar cuenta:", {
      mensaje: error.message,
      detalles: error.response?.data,
    });
    throw new Error(error.response?.data?.message || "Error al eliminar la cuenta");
  }
}

