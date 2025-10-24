import React from "react";
import type { CreateFormValues } from "../pages/CreateAccount";

interface CreateAccountFormProps {
  values: CreateFormValues;
  setValues: React.Dispatch<React.SetStateAction<CreateFormValues>>;
  onSubmit: (e: React.FormEvent) => void;
  loading?: boolean;
  error?: string | null;
}

const CreateAccountForm: React.FC<CreateAccountFormProps> = ({
  values,
  setValues,
  onSubmit,
  loading = false,
  error = null,
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]:
        name === "usuarioId" || name === "saldoInicial"
          ? value === "" ? "" : Number(value)
          : value,
    }));
  };

  return (
    <div className="create-account-container">
      <div className="create-account-card">
        <h1>Crear Nueva Cuenta</h1>

        {error && <p className="error-text">{error}</p>}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log("🔥 Formulario detectó submit");
            onSubmit(e);
        }}
        className="create-account-form"
   >

          <label htmlFor="usuarioId">Usuario ID</label>
          <input
            type="number"
            id="usuarioId"
            name="usuarioId"
            placeholder="Ingrese un ID válido"
            value={values.usuarioId}
            onChange={handleChange}
            required
          />

          <label htmlFor="tipoCuenta">Tipo de Cuenta</label>
          <select
            id="tipoCuenta"
            name="tipoCuenta"
            value={values.tipoCuenta}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un tipo</option>
            <option value="AHORRO">Ahorro</option>
            <option value="CORRIENTE">Corriente</option>
          </select>

          <label htmlFor="saldoInicial">Saldo Inicial</label>
          <input
            type="number"
            id="saldoInicial"
            name="saldoInicial"
            placeholder="Ingrese el saldo inicial"
            value={values.saldoInicial}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Creando..." : "Crear Cuenta"}
          </button>
        </form>

        <a href="/cuentas" className="volver-link">
          Volver al listado
        </a>
      </div>
    </div>
  );
};

export default CreateAccountForm;
