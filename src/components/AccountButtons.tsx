import { useNavigate } from "react-router-dom";

interface AccountButtonsProps {
  cuentaId: number;
  onDelete: () => void;
}

const AccountButtons = ({ cuentaId, onDelete }: AccountButtonsProps) => {
  const navigate = useNavigate();

  return (
    <div className="buttons">
      <button onClick={onDelete} className="btn-delete">🗑️ Eliminar Cuenta</button>
      <button onClick={() => navigate(`/transacciones/cuenta/${cuentaId}`)} className="btn-transacciones">
        📜 Ver Transacciones
      </button>
      <button onClick={() => navigate("/cuentas")} className="btn-volver">
        ⬅️ Volver
      </button>
    </div>
  );
};

export default AccountButtons;
