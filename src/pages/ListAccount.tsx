import { useEffect, useState } from "react";
import CardAccount from "../components/CardAccount";
import { Link } from "react-router-dom";
import { getCuentas } from "../services/cuentasService"; // 👈 Importamos el servicio real
import "../styles/ListAccounts.css";

interface Cuenta {
  id: number;
  usuarioId: number;
  tipoCuenta: string;
  saldo: number;
}

const ListAccounts = () => {
  const [cuentas, setCuentas] = useState<Cuenta[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCuentas = async () => {
      try {
        const data = await getCuentas(); // 👈 Llama al backend real
        setCuentas(data);
      } catch (err) {
        console.error("❌ Error al cargar las cuentas:", err);
        setError("No se pudieron cargar las cuentas 😢");
      }
    };

    fetchCuentas();
  }, []);

  return (
    <div className="card">
      <h1>🏦 Cuentas Bancarias</h1>

      <Link to="/cuentas/crear" className="add-btn">
        + Crear nueva cuenta
      </Link>

      {/* 🔹 Muestra error si el backend falla */}
      {error && <div className="alert">{error}</div>}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Tipo</th>
            <th>Saldo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cuentas.length > 0 ? (
            cuentas.map((cuenta) => (
              <CardAccount key={cuenta.id} cuenta={cuenta} />
            ))
          ) : (
            <tr>
              <td colSpan={5}>No hay cuentas registradas aún 🌸</td>
            </tr>
          )}
        </tbody>
      </table>

      <a href="/" className="volver">
        🏠 Volver al inicio
      </a>
    </div>
  );
};

export default ListAccounts;
