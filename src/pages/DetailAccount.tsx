import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCuentasById } from "../services/cuentasService";

interface Cuenta {
  id: number;
  usuarioId: number;
  tipoCuenta: string;
  saldo: number;
}

const DetailAccount = () => {
  const { id } = useParams<{ id: string }>();
  const [cuenta, setCuenta] = useState<Cuenta | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCuenta = async () => {
      try {
        // 🔹 Llama al backend
        const data = await getCuentasById(Number(id));
        setCuenta(data);
      } catch (err) {
        console.error("Error al cargar la cuenta:", err);
        setError("No se pudo cargar la cuenta 😢");
      }
    };
    fetchCuenta();
  }, [id]);

  if (error)
    return (
      <div className="card">
        <h2>{error}</h2>
        <Link to="/cuentas" className="volver">
          🏠 Volver al listado
        </Link>
      </div>
    );

  if (!cuenta)
    return (
      <div className="card">
        <h2>Cargando cuenta...</h2>
      </div>
    );

  return (
    <div className="card">
      <h1>💳 Detalle de la cuenta #{cuenta.id}</h1>

      <p>
        <strong>👤 Usuario ID:</strong> {cuenta.usuarioId}
      </p>
      <p>
        <strong>🏦 Tipo de cuenta:</strong> {cuenta.tipoCuenta}
      </p>
      <p>
        <strong>💰 Saldo:</strong> ${cuenta.saldo.toLocaleString()}
      </p>

      <div style={{ marginTop: "20px" }}>
        <Link to={`/cuentas/${cuenta.id}/editar`} className="btn-edit">
          ✏️ Ver 
        </Link>
        <Link
          to={`/transacciones/cuenta/${cuenta.id}`}
          className="btn-transacciones"
          style={{ marginLeft: "10px" }}
        >
          📜 Transacciones
        </Link>
        <Link
          to="/cuentas"
          className="volver"
          style={{ display: "block", marginTop: "15px" }}
        >
          ⬅️ Volver al listado
        </Link>
      </div>
    </div>
  );
};

export default DetailAccount;
