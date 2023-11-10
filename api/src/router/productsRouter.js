import express from "express";
import {
    getProduits,
    createProduit,
    getProduit,
    updateProduit,
    deleteProduit,
} from "../routes/productsRoutes.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getProduits);
router.post("/", createProduit);
router.get("/:id", getProduit);
router.put("/:id", authMiddleware, updateProduit);
router.delete("/:id", authMiddleware, deleteProduit);

export default router;
