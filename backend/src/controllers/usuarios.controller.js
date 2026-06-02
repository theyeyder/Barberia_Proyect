import Usuario from "../models/Usuario.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registrar = async (req, res) => {
  try {
    const { username, nombre, password, rol } = req.body;

    const existe = await Usuario.findOne({ username });
    if (existe) {
      return res.status(400).json({ mensaje: "El username ya existe" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const usuario = await Usuario.create({
      username,
      nombre,
      password: passwordHash,
      rol
    });

    res.status(201).json({
      mensaje: "Usuario registrado correctamente",
      usuario: {
        id: usuario._id,
        username: usuario.username,
        nombre: usuario.nombre,
        rol: usuario.rol
      }
    });
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const usuario = await Usuario.findOne({ username });
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    const passwordValida = await bcrypt.compare(password, usuario.password);
    if (!passwordValida) {
      return res.status(401).json({ mensaje: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: usuario._id, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      mensaje: "Inicio de sesión exitoso",
      token,
      usuario: {
        id: usuario._id,
        username: usuario.username,
        nombre: usuario.nombre,
        rol: usuario.rol
      }
    });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};