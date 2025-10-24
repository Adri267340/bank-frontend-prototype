interface AccountInfoProps {
    usuarioId: number;
    tipoCuenta: string;
    saldo: number;
}

const AccountInfo = ({ usuarioId, tipoCuenta, saldo }: AccountInfoProps) => {
  return (
    <div className="info">
      <p><strong>👤 Usuario:</strong> {usuarioId}</p>
      <p><strong>🏦 Tipo:</strong> {tipoCuenta}</p>
      <p>
        <strong>💰 Saldo actual:</strong>{" "}
        <span className="saldo">${saldo.toLocaleString()}</span>
      </p>
    </div>
  );
};

export default AccountInfo;