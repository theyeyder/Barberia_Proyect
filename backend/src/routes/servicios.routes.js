import { Router } from "express";
import { listar, crear, actualizar, eliminar } from "../controllers/servicios.controller.js";

const router = Router();

/**
 * @swagger
 * /api/servicios:
 *   get:
 *     summary: Lista registros de servicios
 */
router.get("/", listar);
router.post("/", crear);
router.put("/:id", actualizar);
router.delete("/:id", eliminar);

export default router;
