import React from "react";
import type { TipoTransaccion } from "../services/TransaccionesService";

interface FormValues {
  tipo: "" | TipoTransaccion;
  monto: number;
  cuentaId: number;
}

interface Props {
  values: FormValues;
  setValues: React.Dispatch<React.SetStateAction<FormValues>>;
  onSubmit: (e: React.FormEvent) => void;
  loading?: boolean;
  error?: string | null;
}

const TransactionForm: React.FC<Props> = ({
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
      [name]: name === "monto" ? Number(value) : value,
    }));
  };

  return (
    <form onSubmit={onSubmit} className="transaction-form">
      {error && <p className="error-text">{error}</p>}

      <label htmlFor="tipo">Tipo:</label>
      <select
        id="tipo"
        name="tipo"
        value={values.tipo}
        onChange={handleChange}
        required
      >
        <option value="">Seleccione...</option>
        <option value="DEPOSITO">Depósito</option>
        <option value="RETIRO">Retiro</option>
      </select>

      <label htmlFor="monto">Monto:</label>
      <input
        type="number"
        id="monto"
        name="monto"
        min="1"
        step="0.01"
        placeholder="Ingrese el monto"
        value={values.monto || ""}
        onChange={handleChange}
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? "Procesando..." : "💰 Guardar Transacción"}
      </button>
    </form>
  );
};

export default TransactionForm;
