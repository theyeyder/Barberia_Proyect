import Cita from "../models/Cita.js";
import Servicio from "../models/Servicio.js";

export const listar = async (req, res) => {
  try {
    const citas = await Cita.find()
      .populate("cliente")
      .populate("barbero")
      .populate("servicio")
      .sort({ fecha: -1 });
    res.json(citas);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

export const crear = async (req, res) => {
  try {
    const servicio = await Servicio.findById(req.body.servicio);
    const total = servicio ? servicio.precio : 0;
    const cita = await Cita.create({ ...req.body, total });
    res.status(201).json(cita);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

export const actualizar = async (req, res) => {
  try {
    const cita = await Cita.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(cita);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

export const eliminar = async (req, res) => {
  try {
    await Cita.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Cita eliminada" });
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};
