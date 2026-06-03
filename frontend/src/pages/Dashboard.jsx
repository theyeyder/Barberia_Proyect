import fondoBarberia from "../Img/Fondos/barberia-bg.jpg";
import { useAuth } from "../context/AuthContext.jsx";

export default function Dashboard() {
  const { usuario } = useAuth();

  return (
    <div
      className="dashboard-bg"
      style={{
        backgroundImage: `url(${fondoBarberia})`
      }}
    >
      <div className="dashboard-overlay">
        <h1>Bienvenido a BarberApp</h1>

        <p>
          Sistema de gestión de clientes, barberos, servicios y citas para barberías.
        </p>

        <p className="usuario-dashboard">
          Usuario actual: {usuario?.nombre}
        </p>

        <div className="cards">
          <div className="card">
            <h3>Clientes</h3>
            <p>Registro y consulta de clientes.</p>
          </div>

          <div className="card">
            <h3>Barberos</h3>
            <p>Control de barberos y especialidades.</p>
          </div>

          <div className="card">
            <h3>Servicios</h3>
            <p>Catálogo de servicios, precios y duración.</p>
          </div>

          <div className="card">
            <h3>Citas</h3>
            <p>Agenda organizada por fecha y horario.</p>
          </div>
        </div>
      </div>
    </div>
  );
}