import mongoose from "mongoose";

const UsuarioSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  nombre: { type: String, required: true },
  password: { type: String, required: true },
  rol: {
    type: String,
    enum: ["Administrador", "Barbero", "Cliente"],
    default: "Cliente"
  },
  estado: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model("Usuario", UsuarioSchema);