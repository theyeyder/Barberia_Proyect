import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const ingresar = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/usuarios/login", form);
      login(res.data.usuario, res.data.token);
      navigate("/");
    } catch (error) {
      setError(error.response?.data?.mensaje || "Error al iniciar sesión");
    }
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={ingresar}>
        <div className="logo-login">
          <div className="logo-circle">💈</div>
          <h1>BarberApp</h1>
          <span>Gestión profesional para barberías</span>
        </div>

        {error && <div className="error">{error}</div>}

        <input
          type="text"
          placeholder="Usuario"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button>Ingresar</button>
      </form>
    </div>
  );
}