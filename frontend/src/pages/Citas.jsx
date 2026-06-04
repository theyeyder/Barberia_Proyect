import { useEffect, useState } from "react";
import api from "../api/axios.js";

import guardarIcon from "../Img/Icon/guardar.png";
import actualizarIcon from "../Img/Icon/actualizar.png";
import cancelarIcon from "../Img/Icon/cancelar.png";
import editarIcon from "../Img/Icon/editar.png";
import eliminarIcon from "../Img/Icon/eliminar.png";

export default function Citas() {
  const [clientes, setClientes] = useState([]);
  const [barberos, setBarberos] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [citas, setCitas] = useState([]);

  const [busqueda, setBusqueda] = useState("");
  const [buscarCliente, setBuscarCliente] = useState("");
  const [clienteEncontrado, setClienteEncontrado] = useState(null);
  const [mensajeCliente, setMensajeCliente] = useState("");

  const [editando, setEditando] = useState(null);

  const [form, setForm] = useState({
    cliente: "",
    barbero: "",
    servicio: "",
    fecha: "",
    hora: "",
    metodoPago: "Tipo de Pago"
  });

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

  useEffect(() => {
    cargar();
  }, []);

  const buscarClientePorDato = () => {
    const texto = buscarCliente.trim().toLowerCase();

    if (!texto) {
      setMensajeCliente("Digite un nombre o número de documento.");
      setClienteEncontrado(null);
      setForm({ ...form, cliente: "" });
      return;
    }

    const cliente = clientes.find(
      (c) =>
        c.documento?.toLowerCase().includes(texto) ||
        c.nombre?.toLowerCase().includes(texto)
    );

    if (!cliente) {
      setMensajeCliente("Cliente no encontrado.");
      setClienteEncontrado(null);
      setForm({ ...form, cliente: "" });
      return;
    }

    setClienteEncontrado(cliente);
    setMensajeCliente("Cliente encontrado.");
    setForm({ ...form, cliente: cliente._id });
  };

  const limpiarFormulario = () => {
    setForm({
      cliente: "",
      barbero: "",
      servicio: "",
      fecha: "",
      hora: "",
      metodoPago: "Tipo de Pago"
    });

    setBuscarCliente("");
    setClienteEncontrado(null);
    setMensajeCliente("");
    setEditando(null);
  };

  const guardar = async (e) => {
    e.preventDefault();

    if (!form.cliente) {
      alert("Primero debe buscar y seleccionar un cliente.");
      return;
    }

    if (editando) {
      await api.put(`/citas/${editando}`, form);
    } else {
      await api.post("/citas", form);
    }

    limpiarFormulario();
    cargar();
  };

  const modificarCita = (cita) => {
    setEditando(cita._id);

    setForm({
      cliente: cita.cliente?._id || "",
      barbero: cita.barbero?._id || "",
      servicio: cita.servicio?._id || "",
      fecha: cita.fecha,
      hora: cita.hora,
      metodoPago: cita.metodoPago
    });

    setClienteEncontrado(cita.cliente);
    setBuscarCliente(cita.cliente?.documento || cita.cliente?.nombre || "");
    setMensajeCliente("Cliente cargado para modificar cita.");
  };

  const cambiarEstado = async (id, estado) => {
    await api.put(`/citas/${id}`, { estado });
    cargar();
  };

  const eliminarCita = async (id) => {
    const confirmar = window.confirm("¿Desea eliminar esta cita?");
    if (!confirmar) return;

    await api.delete(`/citas/${id}`);
    cargar();
  };

  const citasFiltradas = citas.filter((cita) =>
    cita.cliente?.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
    cita.cliente?.documento?.includes(busqueda) ||
    cita.fecha?.includes(busqueda)
  );

  return (
    <section>
      <h1>Citas</h1>

      <div className="form">
        <input
          type="text"
          placeholder="Buscar cliente por documento o nombre"
          value={buscarCliente}
          onChange={(e) => setBuscarCliente(e.target.value)}
        />

        <button
          type="button"
          className="btn-buscar-cliente"
          onClick={buscarClientePorDato}
        >
          Buscar Cliente
        </button>
      </div>

      {mensajeCliente && (
        <div className={clienteEncontrado ? "cliente-ok" : "cliente-error"}>
          {mensajeCliente}
        </div>
      )}

      {clienteEncontrado && (
        <div className="cliente-encontrado">
          <strong>Cliente seleccionado:</strong>
          <span>Nombre: {clienteEncontrado.nombre}</span>
          <span>Documento: {clienteEncontrado.documento}</span>
          <span>Teléfono: {clienteEncontrado.telefono}</span>
          <span>Correo: {clienteEncontrado.correo}</span>
        </div>
      )}

      <form onSubmit={guardar} className="form">
        <select
          value={form.barbero}
          onChange={(e) => setForm({ ...form, barbero: e.target.value })}
        >
          <option value="">Seleccione barbero</option>
          {barberos.map((b) => (
            <option key={b._id} value={b._id}>
              {b.nombre}
            </option>
          ))}
        </select>

        <select
          value={form.servicio}
          onChange={(e) => setForm({ ...form, servicio: e.target.value })}
        >
          <option value="">Seleccione servicio</option>
          {servicios.map((s) => (
            <option key={s._id} value={s._id}>
              {s.nombre} - ${s.precio}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={form.fecha}
          onChange={(e) => setForm({ ...form, fecha: e.target.value })}
        />

        <input
          type="time"
          value={form.hora}
          onChange={(e) => setForm({ ...form, hora: e.target.value })}
        />

        <select
          value={form.metodoPago}
          onChange={(e) => setForm({ ...form, metodoPago: e.target.value })}
        >
          <option>Tipo de Pago</option>
          <option>Transferencia</option>
          <option>Efectivo</option>
        </select>

        <div className="acciones-formulario">
          <button
            type="submit"
            className={
              editando
                ? "btn-icono-form btn-actualizar"
                : "btn-icono-form btn-guardar"
            }
            title={editando ? "Actualizar cita" : "Guardar cita"}
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
              <img src={cancelarIcon} alt="Cancelar" className="icono-form" />
            </button>
          )}
        </div>
      </form>

      <input
        type="text"
        placeholder="Buscar cita por cliente, documento o fecha..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="input-busqueda"
      />

      <div className="list">
        {citasFiltradas.map((cita) => (
          <div className="item" key={cita._id}>
            <strong>
              {cita.cliente?.nombre} - {cita.servicio?.nombre}
            </strong>

            <span>Documento: {cita.cliente?.documento}</span>
            <span>Barbero: {cita.barbero?.nombre}</span>
            <span>Fecha: {cita.fecha}</span>
            <span>Hora: {cita.hora}</span>
            <span>Método de pago: {cita.metodoPago}</span>
            <span>Total: ${cita.total}</span>
            <span>Estado: {cita.estado}</span>

            <div className="acciones-cita">
              <button
                type="button"
                className="btn-cita confirmar"
                onClick={() => cambiarEstado(cita._id, "Confirmada")}
              >
                Confirmar
              </button>

              <button
                type="button"
                className="btn-cita cancelar"
                onClick={() => cambiarEstado(cita._id, "Cancelada")}
              >
                Cancelar
              </button>

              <button
                type="button"
                className="btn-cita reprogramar"
                onClick={() => modificarCita(cita)}
              >
                Reprogramar
              </button>

              <button
                type="button"
                className="btn-icono btn-editar"
                onClick={() => modificarCita(cita)}
                title="Modificar cita"
              >
                <img src={editarIcon} alt="Editar" className="icono-accion" />
              </button>

              <button
                type="button"
                className="btn-icono btn-eliminar"
                onClick={() => eliminarCita(cita._id)}
                title="Eliminar cita"
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