import mongoose from "mongoose";

const CitaSchema = new mongoose.Schema(
  {
    cliente: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cliente",
      required: true,
    },
    barbero: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Barbero",
      required: true,
    },
    servicio: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Servicio",
      required: true,
    },
    fecha: { type: String, required: true },
    hora: { type: String, required: true },
    metodoPago: {
      type: String,
      enum: ["Tipo de Pago", "Transferencia", "Efectivo"],
      default: "Tipo de Pago",
    },
    estado: {
      type: String,
      enum: ["Pendiente", "Confirmada", "Atendida", "Cancelada"],
      default: "Pendiente",
    },
    total: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export default mongoose.model("Cita", CitaSchema);
