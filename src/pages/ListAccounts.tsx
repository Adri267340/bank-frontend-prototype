import CardAccount from "../components/CardAccount";
import "../styles/ListAccounts.css";
const ListAccounts = () => {
  return (
    <div className="card">
      <h1>🏦 Cuentas Bancarias</h1>
      <button className="add-btn">Crear nueva cuenta</button>
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
        {
            Array.from({ length: 20 }).map((_, index) => (
                <CardAccount key={index} />
            ))
            
        }

      </table>
    </div>
  );
}

export default ListAccounts;