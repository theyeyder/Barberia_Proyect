import { useEffect, useState } from "react";
import api from "../api/axios.js";

export default function Clientes() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ nombre: "", documento: "", telefono: "", correo: "" });

  const cargar = async () => {
    const res = await api.get("/clientes");
    setItems(res.data);
  };

  useEffect(() => { cargar(); }, []);

  const guardar = async (e) => {
    e.preventDefault();
    await api.post("/clientes", form);
    setForm({ nombre: "", documento: "", telefono: "", correo: "" });
    cargar();
  };

  return (
    <section>
      <h1>Clientes</h1>
      <form onSubmit={guardar} className="form">
        <input placeholder="Nombre" value={form.nombre} onChange={e => setForm({...form, nombre:e.target.value})} />
        <input placeholder="Documento" value={form.documento} onChange={e => setForm({...form, documento:e.target.value})} />
        <input placeholder="Teléfono" value={form.telefono} onChange={e => setForm({...form, telefono:e.target.value})} />
        <input placeholder="Correo" value={form.correo} onChange={e => setForm({...form, correo:e.target.value})} />
        <button>Guardar</button>
      </form>

      <div className="list">
        {items.map(item => (
          <div className="item" key={item._id}>
            <strong>{item.nombre}</strong>
            <span>{item.documento} - {item.telefono}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
