import express from "express";
import {
    getPromos,
    createPromo,
    getPromo,
    updatePromo,
    deletePromo,
} from "../routes/promosRoutes.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getPromos); // Obtenir toutes les promotions
router.get("/:id", getPromo); // Obtenir une promotion par ID
router.post("/", authMiddleware, createPromo); // Créer une nouvelle promotion
router.put("/:id", authMiddleware, updatePromo); // Mettre à jour une promotion par ID
router.delete("/:id", authMiddleware, deletePromo); // Supprimer une promotion par ID

export default router;
