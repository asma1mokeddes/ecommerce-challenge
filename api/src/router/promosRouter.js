import express from "express";
import {
    getPromos,
    createPromo,
    getPromo,
    updatePromo,
    deletePromo,
} from "../routes/promosRoutes.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
    adminMiddleware,
    adminOrStoreKeeperMiddleware,
} from "../middlewares/userManagementMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, adminOrStoreKeeperMiddleware, getPromos); // Obtenir toutes les promotions
router.get("/:promoId", authMiddleware, adminOrStoreKeeperMiddleware, getPromo); // Obtenir une promotion par ID
router.post("/", authMiddleware, adminOrStoreKeeperMiddleware, createPromo); // Créer une nouvelle promotion
router.put(
    "/:promoId",
    authMiddleware,
    adminOrStoreKeeperMiddleware,
    updatePromo
); // Mettre à jour une promotion par ID
router.delete(
    "/:promoId",
    authMiddleware,
    adminOrStoreKeeperMiddleware,
    deletePromo
); // Supprimer une promotion par ID

export default router;
