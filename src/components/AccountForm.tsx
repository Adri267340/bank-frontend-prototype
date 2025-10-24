interface AccountFormProps {
  nuevoSaldo: number;
  setNuevoSaldo: React.Dispatch<React.SetStateAction<number>>;
  handleUpdate: (e: React.FormEvent) => void;
}

const AccountForm = ({ nuevoSaldo, setNuevoSaldo, handleUpdate }: AccountFormProps) => {
  return (
    <form onSubmit={handleUpdate} className="form-update">
      <label htmlFor="saldo">Actualizar saldo</label>
      <input
        id="saldo"
        type="number"
        value={nuevoSaldo}
        onChange={(e) => setNuevoSaldo(Number(e.target.value))}
        placeholder="Ingrese nuevo saldo"
        required
      />
      <button type="submit">💾 Actualizar</button>
    </form>
  );
};

export default AccountForm;
