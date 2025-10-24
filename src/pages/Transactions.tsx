import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import TransactionForm from "../components/TransactionForm";
import {
  getTransaccionesByCuenta,
  crearTransaccion,
  type Transaccion,
  type TipoTransaccion,
} from "../services/TransaccionesService";

const Transactions = () => {
  const { id } = useParams();
  const cuentaId = Number(id);
  const [transacciones, setTransacciones] = useState<Transaccion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [values, setValues] = useState({
    tipo: "" as "" | TipoTransaccion,
    monto: 0,
    cuentaId,
  });

  // 🔹 Cargar transacciones al iniciar
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTransaccionesByCuenta(cuentaId);
        setTransacciones(data);
      } catch (err) {
        console.error("❌ Error al obtener transacciones:", err);
        setError("No se pudieron cargar las transacciones");
      }
    };
    fetchData();
  }, [cuentaId]);

  // 🔹 Manejo del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (values.tipo === "") {
      setError("Selecciona un tipo de transacción.");
      setLoading(false);
      return;
    }

    if (values.monto <= 0) {
      setError("El monto debe ser mayor a 0.");
      setLoading(false);
      return;
    }

    try {
      const response = await crearTransaccion({
        tipo: values.tipo,
        monto: values.monto,
        cuentaId,
      });

      console.log("✅ Transacción creada:", response);

      // 🔹 Aseguramos que la respuesta sea válida
      if (response && response.id) {
        setTransacciones((prev) => [...prev, response]);
        setValues({ tipo: "", monto: 0, cuentaId });
        alert("✅ Transacción registrada con éxito 💖");
      } else {
        throw new Error("Respuesta inválida del servidor");
      }
    } catch (err) {
      console.error("❌ Error al registrar transacción:", err);
      setError("Saldo insuficiente 😢");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h1>💸 Transacciones</h1>
      <p style={{ color: "#660033", fontWeight: 600 }}>
        Cuenta N° {cuentaId}
      </p>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tipo</th>
            <th>Monto</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {transacciones.length > 0 ? (
            transacciones.map((t) => (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>{t.tipo}</td>
                <td className="saldo">${t.monto.toLocaleString()}</td>
                <td>{new Date(t.fecha).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>No hay transacciones registradas 🌸</td>
            </tr>
          )}
        </tbody>
      </table>

      <h2>➕ Nueva transacción</h2>
      <TransactionForm
        values={values}
        setValues={setValues}
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
      />

      <a href="/cuentas" className="volver">
        ⬅️ Volver a cuentas
      </a>
    </div>
  );
};

export default Transactions;
