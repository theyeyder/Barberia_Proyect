import { useEffect, useState } from "react";
import api from "../api/axios.js";

export default function Servicios() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ nombre: "", descripcion: "", precio: "", duracionMinutos: 30 });

  const cargar = async () => {
    const res = await api.get("/servicios");
    setItems(res.data);
  };

  useEffect(() => { cargar(); }, []);

  const guardar = async (e) => {
    e.preventDefault();
    await api.post("/servicios", form);
    setForm({ nombre: "", descripcion: "", precio: "", duracionMinutos: 30 });
    cargar();
  };

  return (
    <section>
      <h1>Servicios</h1>
      <form onSubmit={guardar} className="form">
        <input placeholder="Nombre" value={form.nombre} onChange={e => setForm({...form, nombre:e.target.value})} />
        <input placeholder="Descripción" value={form.descripcion} onChange={e => setForm({...form, descripcion:e.target.value})} />
        <input placeholder="Precio" type="number" value={form.precio} onChange={e => setForm({...form, precio:e.target.value})} />
        <input placeholder="Duración" type="number" value={form.duracionMinutos} onChange={e => setForm({...form, duracionMinutos:e.target.value})} />
        <button>Guardar</button>
      </form>

      <div className="list">
        {items.map(item => (
          <div className="item" key={item._id}>
            <strong>{item.nombre}</strong>
            <span>${item.precio} - {item.duracionMinutos} minutos</span>
          </div>
        ))}
      </div>
    </section>
  );
}
