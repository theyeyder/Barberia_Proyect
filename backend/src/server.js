import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import bcrypt from "bcryptjs";

import { connectDB } from "./config/db.js";
import Usuario from "./models/Usuario.js";

import clientesRoutes from "./routes/clientes.routes.js";
import barberosRoutes from "./routes/barberos.routes.js";
import serviciosRoutes from "./routes/servicios.routes.js";
import citasRoutes from "./routes/citas.routes.js";
import usuariosRoutes from "./routes/usuarios.routes.js";

dotenv.config();

await connectDB();

const crearAdmin = async () => {
  try {
    await Usuario.deleteMany({ username: "admin" });

    const passwordHash = await bcrypt.hash("123456", 10);

    await Usuario.create({
      username: "admin",
      nombre: "Administrador BarberApp",
      password: passwordHash,
      rol: "Administrador"
    });

    console.log("Usuario admin creado correctamente");
  } catch (error) {
    console.log("Error creando admin:", error.message);
  }
};

await crearAdmin();

const app = express();
app.use(cors());
app.use(express.json());

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "BarberApp API",
      version: "1.0.0",
      description: "API REST para gestión de barbería con MongoDB NoSQL"
    },
    servers: [{ url: "http://localhost:4000" }]
  },
  apis: ["./src/routes/*.js"]
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.json({ mensaje: "API BarberApp funcionando correctamente" });
});

app.use("/api/usuarios", usuariosRoutes);
app.use("/api/clientes", clientesRoutes);
app.use("/api/barberos", barberosRoutes);
app.use("/api/servicios", serviciosRoutes);
app.use("/api/citas", citasRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));