import { useEffect, useState } from "react";
import api from "../api/axios.js";

export default function Citas() {
  const [clientes, setClientes] = useState([]);
  const [barberos, setBarberos] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [citas, setCitas] = useState([]);
  const [form, setForm] = useState({ cliente: "", barbero: "", servicio: "", fecha: "", hora: "", metodoPago: "Presencial" });

  const cargar = async () => {
    const [c, b, s, ci] = await Promise.all([
      api.get("/clientes"),
      api.get("/barberos"),
      api.get("/servicios"),
      api.get("/citas")
    ]);
    setClientes(c.data);
    setBarberos(b.data);
    setServicios(s.data);
    setCitas(ci.data);
  };

  useEffect(() => { cargar(); }, []);

  const guardar = async (e) => {
    e.preventDefault();
    await api.post("/citas", form);
    setForm({ cliente: "", barbero: "", servicio: "", fecha: "", hora: "", metodoPago: "Presencial" });
    cargar();
  };

  return (
    <section>
      <h1>Agenda de citas</h1>
      <form onSubmit={guardar} className="form">
        <select value={form.cliente} onChange={e => setForm({...form, cliente:e.target.value})}>
          <option value="">Seleccione cliente</option>
          {clientes.map(c => <option key={c._id} value={c._id}>{c.nombre}</option>)}
        </select>

        <select value={form.barbero} onChange={e => setForm({...form, barbero:e.target.value})}>
          <option value="">Seleccione barbero</option>
          {barberos.map(b => <option key={b._id} value={b._id}>{b.nombre}</option>)}
        </select>

        <select value={form.servicio} onChange={e => setForm({...form, servicio:e.target.value})}>
          <option value="">Seleccione servicio</option>
          {servicios.map(s => <option key={s._id} value={s._id}>{s.nombre}</option>)}
        </select>

        <input type="date" value={form.fecha} onChange={e => setForm({...form, fecha:e.target.value})} />
        <input type="time" value={form.hora} onChange={e => setForm({...form, hora:e.target.value})} />

        <select value={form.metodoPago} onChange={e => setForm({...form, metodoPago:e.target.value})}>
          <option>Presencial</option>
          <option>Nequi</option>
          <option>Daviplata</option>
          <option>PSE</option>
        </select>

        <button>Agendar cita</button>
      </form>

      <div className="list">
        {citas.map(c => (
          <div className="item" key={c._id}>
            <strong>{c.cliente?.nombre} - {c.servicio?.nombre}</strong>
            <span>{c.fecha} {c.hora} | Barbero: {c.barbero?.nombre} | Total: ${c.total}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
