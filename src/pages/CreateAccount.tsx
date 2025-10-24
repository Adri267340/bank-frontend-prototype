// src/pages/CreateAccount.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateAccountForm from "../components/CreateAccountForm";
import { crearCuenta } from "../services/cuentasService";
import "../styles/CreateAccount.css";

export interface CreateFormValues {
  usuarioId: number | string;
  tipoCuenta: string;
  saldoInicial: number | string;
}

const CreateAccountPage: React.FC = () => {
  const [values, setValues] = useState<CreateFormValues>({
    usuarioId: "",
    tipoCuenta: "",
    saldoInicial: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("🚀 handleSubmit ejecutado");
    setLoading(true);
    setError(null);

    try {
      const payload = {
        usuarioId: Number(values.usuarioId),
        tipoCuenta: values.tipoCuenta,
        saldoInicial: Number(values.saldoInicial),
      };

      await crearCuenta(payload);

      alert("✅ Cuenta creada exitosamente!");
      navigate("/cuentas"); // redirige al listado
    } catch (err: any) {
      console.error("Error al crear cuenta:", err);
      setError("Error al crear la cuenta. Verifica los datos o el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CreateAccountForm
      values={values}
      setValues={setValues}
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
    />
  );
};

export default CreateAccountPage;
