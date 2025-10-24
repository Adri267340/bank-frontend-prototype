import React, { useState } from "react";
import axios from "axios";
import InputField from "../components/InputField";
import ButtonPrimary from "../components/ButtonPrimary";
import "../styles/RegisterUser.css";
import { Link, useNavigate } from "react-router-dom";

interface FormData {
  nombre: string;
  email: string;
  password: string;
}

const RegisterUser: React.FC = () => {
  const [form, setForm] = useState<FormData>({
    nombre: "",
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
      await axios.post("http://localhost:8080/api/usuarios", form);
      alert("Usuario registrado con éxito 🎉");
      navigate("/login");
    } catch (err) {
      setError("Error al registrar el usuario. Verifica los datos.");
      console.error(err);
    }
  };

  return (
    <div className="create-account-container">
      <div className="create-account-card">
        <h1>Crear Cuenta</h1>

        <form className="create-account-form" onSubmit={handleSubmit}>
          <InputField
            label="Nombre completo"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
          />
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

          <ButtonPrimary text="Registrar cuenta 💖" />
        </form>

        <Link className="volver-link" to="/login">
          ¿Ya tienes cuenta? Inicia sesión aquí 💬
        </Link>
      </div>
    </div>
  );
};

export default RegisterUser;
