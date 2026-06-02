import mongoose from "mongoose";

const ServicioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: String,
  precio: { type: Number, required: true },
  duracionMinutos: { type: Number, default: 30 },
  estado: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model("Servicio", ServicioSchema);
