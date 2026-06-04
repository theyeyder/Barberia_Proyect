import { useEffect, useState } from "react";
import api from "../api/axios.js";
import editarIcon from "../Img/Icon/editar.png";
import eliminarIcon from "../Img/Icon/eliminar.png";
import guardarIcon from "../Img/Icon/guardar.png";
import actualizarIcon from "../Img/Icon/actualizar.png";
import cancelarIcon from "../Img/Icon/cancelar.png";

export default function Clientes() {
  const [items, setItems] = useState([]);

  const [busqueda, setBusqueda] = useState("");

  const [editando, setEditando] = useState(null);

  const [form, setForm] = useState({
    nombre: "",
    documento: "",
    telefono: "",
    correo: "",
  });

  const cargar = async () => {
    const res = await api.get("/clientes");
    setItems(res.data);
  };

  useEffect(() => {
    cargar();
  }, []);

  const limpiarFormulario = () => {
    setForm({
      nombre: "",
      documento: "",
      telefono: "",
      correo: "",
    });

    setEditando(null);
  };

  const guardar = async (e) => {
    e.preventDefault();

    if (editando) {
      await api.put(`/clientes/${editando}`, form);
    } else {
      await api.post("/clientes", form);
    }

    limpiarFormulario();
    cargar();
  };

  const editarCliente = (cliente) => {
    setEditando(cliente._id);

    setForm({
      nombre: cliente.nombre,
      documento: cliente.documento,
      telefono: cliente.telefono,
      correo: cliente.correo,
    });
  };

  const eliminarCliente = async (id) => {
    const confirmar = window.confirm("¿Desea eliminar este cliente?");

    if (!confirmar) return;

    await api.delete(`/clientes/${id}`);

    cargar();
  };

  const clientesFiltrados = items.filter(
    (cliente) =>
      cliente.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
      cliente.documento?.includes(busqueda),
  );

  return (
    <section>
      <h1>Clientes</h1>

      <form onSubmit={guardar} className="form">
        <input
          placeholder="Nombre"
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
        />

        <input
          placeholder="Documento"
          value={form.documento}
          onChange={(e) => setForm({ ...form, documento: e.target.value })}
        />

        <input
          placeholder="Teléfono"
          value={form.telefono}
          onChange={(e) => setForm({ ...form, telefono: e.target.value })}
        />

        <input
          placeholder="Correo"
          value={form.correo}
          onChange={(e) => setForm({ ...form, correo: e.target.value })}
        />
        <div className="acciones-formulario">
          <button
            type="submit"
            className={
              editando
                ? "btn-icono-form btn-actualizar"
                : "btn-icono-form btn-guardar"
            }
            title={editando ? "Actualizar cliente" : "Guardar cliente"}
          >
            <img
              src={editando ? actualizarIcon : guardarIcon}
              alt="Guardar"
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
              <img src={cancelarIcon} alt="Cancelar" className="icono-form" />
            </button>
          )}
        </div>
      </form>

      <input
        type="text"
        placeholder="Buscar por nombre o documento..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "20px",
          borderRadius: "10px",
        }}
      />

      <div className="list">
        {clientesFiltrados.map((item) => (
          <div className="item" key={item._id}>
            <strong>{item.nombre}</strong>

            <span>Documento: {item.documento}</span>

            <span>Teléfono: {item.telefono}</span>

            <span>Correo: {item.correo}</span>

            <div className="acciones-cliente">
              <button
                type="button"
                className="btn-icono btn-editar"
                onClick={() => editarCliente(item)}
                title="Editar cliente"
              >
                <img src={editarIcon} alt="Editar" className="icono-accion" />
              </button>

              <button
                type="button"
                className="btn-icono btn-eliminar"
                onClick={() => eliminarCliente(item._id)}
                title="Eliminar cliente"
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
