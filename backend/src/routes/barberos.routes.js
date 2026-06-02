import { Router } from "express";
import { listar, crear, actualizar, eliminar } from "../controllers/barberos.controller.js";

const router = Router();

/**
 * @swagger
 * /api/barberos:
 *   get:
 *     summary: Lista registros de barberos
 */
router.get("/", listar);
router.post("/", crear);
router.put("/:id", actualizar);
router.delete("/:id", eliminar);

export default router;
