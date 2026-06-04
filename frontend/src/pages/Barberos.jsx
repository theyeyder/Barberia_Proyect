import { useEffect, useState } from "react";
import api from "../api/axios.js";

import editarIcon from "../Img/Icon/editar.png";
import eliminarIcon from "../Img/Icon/eliminar.png";
import guardarIcon from "../Img/Icon/guardar.png";
import actualizarIcon from "../Img/Icon/actualizar.png";
import cancelarIcon from "../Img/Icon/cancelar.png";

export default function Barberos() {
  const [items, setItems] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [editando, setEditando] = useState(null);

  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    especialidad: ""
  });

  const cargar = async () => {
    const res = await api.get("/barberos");
    setItems(res.data);
  };

  useEffect(() => {
    cargar();
  }, []);

  const limpiarFormulario = () => {
    setForm({
      nombre: "",
      telefono: "",
      especialidad: ""
    });

    setEditando(null);
  };

  const guardar = async (e) => {
    e.preventDefault();

    if (editando) {
      await api.put(`/barberos/${editando}`, form);
    } else {
      await api.post("/barberos", form);
    }

    limpiarFormulario();
    cargar();
  };

  const editarBarbero = (barbero) => {
    setEditando(barbero._id);

    setForm({
      nombre: barbero.nombre,
      telefono: barbero.telefono,
      especialidad: barbero.especialidad
    });
  };

  const eliminarBarbero = async (id) => {
    const confirmar = window.confirm(
      "¿Desea eliminar este barbero?"
    );

    if (!confirmar) return;

    await api.delete(`/barberos/${id}`);
    cargar();
  };

  const barberosFiltrados = items.filter((barbero) =>
    barbero.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
    barbero.telefono?.includes(busqueda) ||
    barbero.especialidad?.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <section>
      <h1>Barberos</h1>

      <form onSubmit={guardar} className="form">
        <input
          placeholder="Nombre"
          value={form.nombre}
          onChange={(e) =>
            setForm({ ...form, nombre: e.target.value })
          }
        />

        <input
          placeholder="Teléfono"
          value={form.telefono}
          onChange={(e) =>
            setForm({ ...form, telefono: e.target.value })
          }
        />

        <input
          placeholder="Especialidad"
          value={form.especialidad}
          onChange={(e) =>
            setForm({ ...form, especialidad: e.target.value })
          }
        />

        <div className="acciones-formulario">
          <button
            type="submit"
            className={
              editando
                ? "btn-icono-form btn-actualizar"
                : "btn-icono-form btn-guardar"
            }
            title={editando ? "Actualizar barbero" : "Guardar barbero"}
          >
            <img
              src={editando ? actualizarIcon : guardarIcon}
              alt={editando ? "Actualizar" : "Guardar"}
              className="icono-form"
            />
          </button>

          {editando && (
            <button
              type="button"
              className="btn-icono-form btn-cancelar"
              onClick={limpiarFormulario}
              title="Cancelar edición"
            >
              <img
                src={cancelarIcon}
                alt="Cancelar"
                className="icono-form"
              />
            </button>
          )}
        </div>
      </form>

      <input
        type="text"
        placeholder="Buscar por nombre, teléfono o especialidad..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="input-busqueda"
      />

      <div className="list">
        {barberosFiltrados.map((item) => (
          <div className="item" key={item._id}>
            <strong>{item.nombre}</strong>

            <span>Teléfono: {item.telefono}</span>

            <span>Especialidad: {item.especialidad}</span>

            <div className="acciones-cliente">
              <button
                type="button"
                className="btn-icono btn-editar"
                onClick={() => editarBarbero(item)}
                title="Editar barbero"
              >
                <img
                  src={editarIcon}
                  alt="Editar"
                  className="icono-accion"
                />
              </button>

              <button
                type="button"
                className="btn-icono btn-eliminar"
                onClick={() => eliminarBarbero(item._id)}
                title="Eliminar barbero"
              >
                <img
                  src={eliminarIcon}
                  alt="Eliminar"
                  className="icono-accion"
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}