import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";
import logo from "../Img/Icon/Logo.png";

export default function Login() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const ingresar = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/usuarios/login", {
        username: form.username.trim(),
        password: form.password.trim(),
      });

      login(res.data.usuario, res.data.token);
      navigate("/");
    } catch (error) {
      console.log("ERROR LOGIN:", error);
      console.log("RESPUESTA:", error.response?.data);
      setError(error.response?.data?.mensaje || error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-overlay">
        <form className="login-card" onSubmit={ingresar}>
          <div className="logo-login">
            <img src={logo} alt="BarberApp" className="logo-img" />

            <h1>BarberApp</h1>

            <span>Gestión profesional para barberías</span>
          </div>

          {error && <div className="error">{error}</div>}

          <input
            type="text"
            placeholder="Usuario"
            value={form.username}
            onChange={(e) =>
              setForm({ ...form, username: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button>Ingresar</button>
        </form>
      </div>
    </div>
  );
}