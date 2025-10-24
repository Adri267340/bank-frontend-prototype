import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RegisterUser from "../pages/RegisterUser";
import Login from "../pages/Login";
import ListAccounts from "../pages/ListAccount";
import CreateAccount from "../pages/CreateAccount";
import EditAccount from "../pages/EditAccount";
import DetailAccount from "../pages/DetailAccount";
import Transactions from "../pages/Transactions";
import NotFound from "../pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 👇 Esta línea es la clave: redirige la raíz directamente al login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* 🔹 Login y registro */}
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<RegisterUser />} />

        {/* 🔹 Cuentas */}
        <Route path="/cuentas" element={<ListAccounts />} />
        <Route path="/cuentas/crear" element={<CreateAccount />} />
        <Route path="/cuentas/:id" element={<DetailAccount />} />
        <Route path="/cuentas/:id/editar" element={<EditAccount />} />

        {/* 🔹 Transacciones */}
        <Route path="/transacciones/cuenta/:id" element={<Transactions />} />

        {/* 🔹 Fallback 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
