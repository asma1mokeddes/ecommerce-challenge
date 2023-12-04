import express from "express";
import {
    getPromos,
    createPromo,
    getPromo,
    updatePromo,
    deletePromo,
} from "../routes/promosRoutes.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { adminMiddleware } from "../middlewares/userManagementMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, adminMiddleware, getPromos); // Obtenir toutes les promotions
router.get("/:promoId", authMiddleware, adminMiddleware, getPromo); // Obtenir une promotion par ID
router.post("/create", authMiddleware, adminMiddleware, createPromo); // Créer une nouvelle promotion
router.put("/:promoId", authMiddleware, adminMiddleware, updatePromo); // Mettre à jour une promotion par ID
router.delete("/:promoId", authMiddleware, adminMiddleware, deletePromo); // Supprimer une promotion par ID

export default router;
