import axios from "axios";

// ✅ Definimos el tipo base de Cuenta
export interface Cuenta {
  id: number;
  usuarioId: number;
  tipoCuenta: string;
  saldo: number;
}

export interface CreateCuentaPayload {
  usuarioId: number;
  tipoCuenta: string;
  saldoInicial: number;
}

// ✅ Configuración de Axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
});

// ✅ Obtener todas las cuentas
export const getCuentas = async () => {
  const response = await api.get("/cuentas");
  return response.data;
};

// ✅ Obtener cuenta por ID
export const getCuentasById = async (id: number): Promise<Cuenta> => {
  const response = await api.get(`/cuentas/${id}`);
  return response.data;
};

// ✅ Actualizar saldo de una cuenta
export const updateCuentaSaldo = async (id: number, saldo: number) => {
  const res = await api.put(`/cuentas/${id}`, { saldo });
  return res.data;
};

// ✅ Eliminar cuenta
export const deleteCuenta = async (id: number) => {
  const res = await api.delete(`/cuentas/${id}`);
  return res.data;
};

// ✅ Crear nueva cuenta
export const crearCuenta = async (data: CreateCuentaPayload) => {
  const response = await api.post("/cuentas", data);
  return response.data;
};
