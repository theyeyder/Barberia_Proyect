import { useAuth } from "../context/AuthContext.jsx";

export default function Dashboard() {
  const { usuario } = useAuth();

  return (
    <section>
      <h1>Panel principal</h1>
      <p>Aplicación web para gestionar clientes, barberos, servicios y citas de una barbería.</p>
      <div className="cards">
        <div className="card"><h3>Clientes</h3><p>Registro y consulta de clientes.</p></div>
        <div className="card"><h3>Citas</h3><p>Agenda organizada por fecha y barbero.</p></div>
        <div className="card"><h3>Servicios</h3><p>Control de precios y duración.</p></div>
      </div>
      <p className="usuario">Usuario actual: {usuario ? usuario.nombre : "Invitado"}</p>
    </section>
  );
}
