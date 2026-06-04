import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";

import clientesIcon from "../Img/Icon/clientes.png";
import barberosIcon from "../Img/Icon/barberos.png";
import serviciosIcon from "../Img/Icon/servicios.png";
import citasIcon from "../Img/Icon/citas.png";

export default function Dashboard() {
  const { usuario } = useAuth();
  const navigate = useNavigate();

  const [estadisticas, setEstadisticas] = useState({
    clientes: 0,
    barberos: 0,
    servicios: 0,
    citas: 0
  });

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const [clientes, barberos, servicios, citas] =
        await Promise.all([
          api.get("/clientes"),
          api.get("/barberos"),
          api.get("/servicios"),
          api.get("/citas")
        ]);

      setEstadisticas({
        clientes: clientes.data.length,
        barberos: barberos.data.length,
        servicios: servicios.data.length,
        citas: citas.data.length
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div style={{ marginBottom: "35px" }}>
        <h1>Bienvenido {usuario?.nombre}</h1>

        <p style={{ color: "#c9a03d" }}>
          Sistema de gestión para barberías
        </p>
      </div>

      {/* ESTADISTICAS */}
      <div
        className="cards"
        style={{ marginBottom: "40px" }}
      >
        <div className="card">
          <h3>Clientes</h3>
          <h1>{estadisticas.clientes}</h1>
        </div>

        <div className="card">
          <h3>Barberos</h3>
          <h1>{estadisticas.barberos}</h1>
        </div>

        <div className="card">
          <h3>Servicios</h3>
          <h1>{estadisticas.servicios}</h1>
        </div>

        <div className="card">
          <h3>Citas</h3>
          <h1>{estadisticas.citas}</h1>
        </div>
      </div>

      {/* MODULOS */}
      <div className="cards">

        <div
          className="card dashboard-card"
          onClick={() => navigate("/clientes")}
        >
          <img
            src={clientesIcon}
            alt="Clientes"
            className="module-icon"
          />

          <h3>Clientes</h3>

          <p>
            Registro y consulta de clientes.
          </p>
        </div>

        <div
          className="card dashboard-card"
          onClick={() => navigate("/barberos")}
        >
          <img
            src={barberosIcon}
            alt="Barberos"
            className="module-icon"
          />

          <h3>Barberos</h3>

          <p>
            Control de barberos y especialidades.
          </p>
        </div>

        <div
          className="card dashboard-card"
          onClick={() => navigate("/servicios")}
        >
          <img
            src={serviciosIcon}
            alt="Servicios"
            className="module-icon"
          />

          <h3>Servicios</h3>

          <p>
            Catálogo de servicios, precios y duración.
          </p>
        </div>

        <div
          className="card dashboard-card"
          onClick={() => navigate("/citas")}
        >
          <img
            src={citasIcon}
            alt="Citas"
            className="module-icon"
          />

          <h3>Citas</h3>

          <p>
            Agenda organizada por fecha y horario.
          </p>
        </div>

      </div>
    </>
  );
}