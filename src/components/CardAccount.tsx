import { Link } from "react-router-dom";

interface Cuenta {
  id: number;
  usuarioId: number;
  tipoCuenta: string;
  saldo: number;
}

interface CardAccountProps {
  cuenta: Cuenta;
}

const CardAccount = ({ cuenta }: CardAccountProps) => {
  return (
    <tr>
      <td>{cuenta.id}</td>
      <td>{cuenta.usuarioId}</td>
      <td>{cuenta.tipoCuenta}</td>
      <td className="saldo">${cuenta.saldo.toLocaleString()}</td>
      <td className="actions">
        <Link to={`/cuentas/${cuenta.id}`} className="btn-view">
          Ver
        </Link>
        <Link to={`/cuentas/${cuenta.id}/editar`} className="btn-edit">
          Editar
        </Link>
        <Link
          to={`/transacciones/cuenta/${cuenta.id}`}
          className="btn-transacciones"
        >
          Transacciones
        </Link>
      </td>
    </tr>
  );
};

export default CardAccount;
