import { useNavigate } from "react-router-dom";
import fondoBarberia from "../Img/Fondos/barberia-bg.jpg";
import { useAuth } from "../context/AuthContext.jsx";
import clientesIcon from "../Img/Icon/clientes.png";
import barberosIcon from "../Img/Icon/barberos.png";
import serviciosIcon from "../Img/Icon/servicios.png";
import citasIcon from "../Img/Icon/citas.png";

export default function Dashboard() {
  const { usuario } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="cards">

  <div
    className="card dashboard-card"
    onClick={() => navigate("/clientes")}
  >
    <img src={clientesIcon} alt="Clientes" className="module-icon" />
    <h3>Clientes</h3>
    <p>Registro y consulta de clientes.</p>
  </div>

  <div
    className="card dashboard-card"
    onClick={() => navigate("/barberos")}
  >
    <img src={barberosIcon} alt="Barberos" className="module-icon" />
    <h3>Barberos</h3>
    <p>Control de barberos y especialidades.</p>
  </div>

  <div
    className="card dashboard-card"
    onClick={() => navigate("/servicios")}
  >
    <img src={serviciosIcon} alt="Servicios" className="module-icon" />
    <h3>Servicios</h3>
    <p>Catálogo de servicios, precios y duración.</p>
  </div>

  <div
    className="card dashboard-card"
    onClick={() => navigate("/citas")}
  >
    <img src={citasIcon} alt="Citas" className="module-icon" />
    <h3>Citas</h3>
    <p>Agenda organizada por fecha y horario.</p>
  </div>

</div>);
}