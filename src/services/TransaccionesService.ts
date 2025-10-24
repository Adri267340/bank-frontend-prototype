import axios from "axios";
import apiBaseUrl from "../config/apiConfig";

// 🔹 Configuración base del cliente Axios
const api = axios.create({
  baseURL: apiBaseUrl,
});


// 🔹 Tipos de transacción
export type TipoTransaccion = "DEPOSITO" | "RETIRO";

// 🔹 Estructura de una transacción
export interface Transaccion {
  id: number;
  tipo: TipoTransaccion;
  monto: number;
  fecha: string;
  cuentaId: number;
}

export interface NuevaTransaccionPayload {
  tipo: TipoTransaccion;
  monto: number;
  cuentaId: number;
}

// ✅ Obtener todas las transacciones de una cuenta
export const getTransaccionesByCuenta = async (cuentaId: number) => {
  const response = await api.get(`/transacciones/cuenta/${cuentaId}`);
  return response.data;
};

export const crearTransaccion = async (data: {
  tipo: string;
  monto: number;
  cuentaId: number;
}) => {
  const response = await fetch("http://localhost:8080/api/transacciones", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const text = await response.text();
    console.error("❌ Error del backend:", text);
    throw new Error("Error al crear la transacción");
  }

  return await response.json();
};

