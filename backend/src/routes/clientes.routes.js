import { Router } from "express";
import {
  listar,
  crear,
  actualizar,
  eliminar,
  buscarClientes
} from "../controllers/clientes.controller.js";
const router = Router();

/**
 * @swagger
 * /api/clientes:
 *   get:
 *     summary: Lista registros de clientes
 */
router.get("/", listar);
router.post("/", crear);
router.put("/:id", actualizar);
router.delete("/:id", eliminar);
router.get("/buscar", buscarClientes);

export default router;
