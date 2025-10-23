const CardAccount = () => {   
    return (
         <tbody>
            <tr>
              <td>201</td>
              <td>56</td>
              <td>Corriente</td>
              <td className="saldo">120000</td>
              <td className="actions">
                <a href="/cuentas/<%= cuenta.id %>" className="btn-view">Ver</a>
                <a href="/cuentas/<%= cuenta.id %>/editar" className="btn-edit">Editar</a>
                <a href="/transacciones/cuenta/<%= cuenta.id %>" className="btn-transacciones">Transacciones</a>
              </td>
            </tr>

         </tbody>
    )
}

export default CardAccount;
