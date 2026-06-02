import { useEffect, useState } from "react";
import api from "../api/axios.js";

export default function Barberos() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ nombre: "", telefono: "", especialidad: "" });

  const cargar = async () => {
    const res = await api.get("/barberos");
    setItems(res.data);
  };

  useEffect(() => { cargar(); }, []);

  const guardar = async (e) => {
    e.preventDefault();
    await api.post("/barberos", form);
    setForm({ nombre: "", telefono: "", especialidad: "" });
    cargar();
  };

  return (
    <section>
      <h1>Barberos</h1>
      <form onSubmit={guardar} className="form">
        <input placeholder="Nombre" value={form.nombre} onChange={e => setForm({...form, nombre:e.target.value})} />
        <input placeholder="Teléfono" value={form.telefono} onChange={e => setForm({...form, telefono:e.target.value})} />
        <input placeholder="Especialidad" value={form.especialidad} onChange={e => setForm({...form, especialidad:e.target.value})} />
        <button>Guardar</button>
      </form>

      <div className="list">
        {items.map(item => (
          <div className="item" key={item._id}>
            <strong>{item.nombre}</strong>
            <span>{item.especialidad}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
