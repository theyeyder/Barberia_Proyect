import mongoose from "mongoose";

const ClienteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  documento: { type: String, required: true, unique: true },
  telefono: String,
  correo: String,
  estado: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model("Cliente", ClienteSchema);
