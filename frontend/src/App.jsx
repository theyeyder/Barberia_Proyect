import { Routes, Route, Link, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext.jsx";
import RutaPrivada from "./components/RutaPrivada.jsx";

import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Clientes from "./pages/Clientes.jsx";
import Barberos from "./pages/Barberos.jsx";
import Servicios from "./pages/Servicios.jsx";
import Citas from "./pages/Citas.jsx";

export default function App() {
  const { usuario, logout } = useAuth();

  return (
    <div>
      {usuario && (
        <nav className="navbar">
          <h2>BarberApp</h2>
          <Link to="/">Inicio</Link>
          <Link to="/clientes">Clientes</Link>
          <Link to="/barberos">Barberos</Link>
          <Link to="/servicios">Servicios</Link>
          <Link to="/citas">Citas</Link>
          <span>{usuario.nombre}</span>
          <button onClick={logout}>Salir</button>
        </nav>
      )}

      <main className={usuario ? "container" : ""}>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/"
            element={
              <RutaPrivada>
                <Dashboard />
              </RutaPrivada>
            }
          />

          <Route
            path="/clientes"
            element={
              <RutaPrivada>
                <Clientes />
              </RutaPrivada>
            }
          />

          <Route
            path="/barberos"
            element={
              <RutaPrivada>
                <Barberos />
              </RutaPrivada>
            }
          />

          <Route
            path="/servicios"
            element={
              <RutaPrivada>
                <Servicios />
              </RutaPrivada>
            }
          />

          <Route
            path="/citas"
            element={
              <RutaPrivada>
                <Citas />
              </RutaPrivada>
            }
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}