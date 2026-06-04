import { useEffect, useState } from "react";
import api from "../api/axios.js";

import editarIcon from "../Img/Icon/editar.png";
import eliminarIcon from "../Img/Icon/eliminar.png";
import guardarIcon from "../Img/Icon/guardar.png";
import actualizarIcon from "../Img/Icon/actualizar.png";
import cancelarIcon from "../Img/Icon/cancelar.png";

export default function Servicios() {
  const [items, setItems] = useState([]);
  const [editando, setEditando] = useState(null);

  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    duracionMinutos: 30
  });

  const cargar = async () => {
    const res = await api.get("/servicios");
    setItems(res.data);
  };

  useEffect(() => {
    cargar();
  }, []);

  const limpiarFormulario = () => {
    setForm({
      nombre: "",
      descripcion: "",
      precio: "",
      duracionMinutos: 30
    });

    setEditando(null);
  };

  const guardar = async (e) => {
    e.preventDefault();

    if (editando) {
      await api.put(`/servicios/${editando}`, form);
    } else {
      await api.post("/servicios", form);
    }

    limpiarFormulario();
    cargar();
  };

  const editarServicio = (servicio) => {
    setEditando(servicio._id);

    setForm({
      nombre: servicio.nombre,
      descripcion: servicio.descripcion,
      precio: servicio.precio,
      duracionMinutos: servicio.duracionMinutos
    });
  };

  const eliminarServicio = async (id) => {
    const confirmar = window.confirm(
      "¿Desea eliminar este servicio?"
    );

    if (!confirmar) return;

    await api.delete(`/servicios/${id}`);
    cargar();
  };

  return (
    <section>
      <h1>Servicios</h1>

      <form onSubmit={guardar} className="form">
        <input
          placeholder="Nombre del servicio"
          value={form.nombre}
          onChange={(e) =>
            setForm({ ...form, nombre: e.target.value })
          }
        />

        <input
          placeholder="Descripción"
          value={form.descripcion}
          onChange={(e) =>
            setForm({ ...form, descripcion: e.target.value })
          }
        />

        <input
          placeholder="Precio"
          type="number"
          value={form.precio}
          onChange={(e) =>
            setForm({ ...form, precio: e.target.value })
          }
        />

        <input
          placeholder="Duración en minutos"
          type="number"
          value={form.duracionMinutos}
          onChange={(e) =>
            setForm({
              ...form,
              duracionMinutos: e.target.value
            })
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
            title={editando ? "Actualizar servicio" : "Guardar servicio"}
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

      <div className="list">
        {items.map((item) => (
          <div className="item" key={item._id}>
            <strong>{item.nombre}</strong>

            <span>Descripción: {item.descripcion}</span>

            <span>Precio: ${item.precio}</span>

            <span>Duración: {item.duracionMinutos} minutos</span>

            <div className="acciones-cliente">
              <button
                type="button"
                className="btn-icono btn-editar"
                onClick={() => editarServicio(item)}
                title="Editar servicio"
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
                onClick={() => eliminarServicio(item._id)}
                title="Eliminar servicio"
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