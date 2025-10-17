import axios from "axios";

const API_URL = process.env.BACKEND_URL || "http://localhost:8080/api/transacciones";

interface Transaccion {
  id: number;
  tipo: "DEPOSITO" | "RETIRO";
  monto: number;
  fecha: string;
  cuentaId: number;
}

export async function listarTransacciones(cuentaId?: number) {
  try {
    const url = cuentaId
      ? `${API_URL}?cuentaId=${cuentaId}`
      : API_URL;
    console.log("📤 Solicitando transacciones:", url);
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("❌ Error al obtener transacciones:", error);
    throw error;
  }
}

export async function crearTransaccion(data: Omit<Transaccion, "id" | "fecha">) {
  try {
    console.log("📤 Creando transacción:", data);
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (error) {
    console.error("❌ Error al crear transacción:", error);
    throw error;
  }
}
