import Modelo from "../models/Barbero.js";

export const listar = async (req, res) => {
  try {
    const datos = await Modelo.find().sort({ createdAt: -1 });
    res.json(datos);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

export const crear = async (req, res) => {
  try {
    const nuevo = await Modelo.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

export const actualizar = async (req, res) => {
  try {
    const actualizado = await Modelo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(actualizado);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

export const eliminar = async (req, res) => {
  try {
    await Modelo.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Registro eliminado" });
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};
