import { Router } from "express";
import { listar, crear, actualizar, eliminar } from "../controllers/citas.controller.js";

const router = Router();

/**
 * @swagger
 * /api/citas:
 *   get:
 *     summary: Lista registros de citas
 */
router.get("/", listar);
router.post("/", crear);
router.put("/:id", actualizar);
router.delete("/:id", eliminar);

export default router;
