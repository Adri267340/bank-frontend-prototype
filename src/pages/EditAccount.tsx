import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCuentasById } from "../services/cuentasService";
import type { Cuenta } from "../services/cuentasService"; // 👈 Import solo de tipo

const EditAccount = () => {
  const { id } = useParams<{ id: string }>();
  const [cuenta, setCuenta] = useState<Cuenta | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCuenta = async () => {
      try {
        const data = await getCuentasById(Number(id));
        setCuenta(data);
      } catch (err) {
        console.error("Error al cargar la cuenta:", err);
        setError("No se pudo cargar la cuenta 😢");
      }
    };
    fetchCuenta();
  }, [id]);

  if (error) return <div className="card">{error}</div>;
  if (!cuenta) return <div className="card">Cargando cuenta...</div>;

  return (
    <div className="card">
      <h1>Detalle de cuenta #{cuenta.id}</h1>

      <form>
        <label>Tipo de cuenta</label>
        <input type="text" value={cuenta.tipoCuenta} readOnly />

        <label>Saldo actual</label>
        <input type="number" value={cuenta.saldo} readOnly />

        <button
          type="button"
          className="btn-edit"
          onClick={() => navigate("/cuentas")}
        >
          🏦 Volver al listado
        </button>
      </form>
    </div>
  );
};

export default EditAccount;
