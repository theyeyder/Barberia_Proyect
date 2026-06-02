import mongoose from "mongoose";

const BarberoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  telefono: String,
  especialidad: String,
  disponible: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model("Barbero", BarberoSchema);
