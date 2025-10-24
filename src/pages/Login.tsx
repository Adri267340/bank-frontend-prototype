import React, { useState } from "react";
import axios from "axios";
import InputField from "../components/InputField";
import ButtonPrimary from "../components/ButtonPrimary";
import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";

interface LoginData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [form, setForm] = useState<LoginData>({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/usuarios/login",
        form
      );

      alert(`Bienvenido ${response.data.nombre} 💖`);
      navigate("/cuentas");
    } catch (err: any) {
      console.error(err);
      if (err.response?.status === 404) {
        setError("Usuario no encontrado 🧐");
      } else {
        setError("Correo o contraseña incorrectos 😓");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Iniciar Sesión</h1>

        <form className="login-form" onSubmit={handleSubmit}>
          <InputField
            label="Correo electrónico"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
          <InputField
            label="Contraseña"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />

          {error && <p className="error-text">{error}</p>}

          <ButtonPrimary text="Ingresar 🚀" />
        </form>

        <Link className="volver-link" to="/registro">
          ¿No tienes cuenta? Regístrate aquí 💖
        </Link>
      </div>
    </div>
  );
};

export default Login;
