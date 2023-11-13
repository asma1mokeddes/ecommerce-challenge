import express from "express";
import {
    getBrands,
    createBrand,
    getBrand,
    updateBrand,
    deleteBrand,
} from "../routes/brandsRoutes.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { adminOrStoreKeeperMiddleware } from "../middlewares/userManagementMiddleware.js";

const router = express.Router();

// Obtenir toutes les marques
router.get("/", getBrands);

// Obtenir une marque par ID
router.get("/:brandId", getBrand);

// Créer une nouvelle marque

router.post("/", authMiddleware, adminOrStoreKeeperMiddleware, createBrand);
// Mettre à jour une marque par ID

router.put(
    "/:brandId",
    authMiddleware,
    adminOrStoreKeeperMiddleware,
    updateBrand
);
// Supprimer une marque par ID
router.delete(
    "/:brandId",
    authMiddleware,
    adminOrStoreKeeperMiddleware,
    deleteBrand
);

export default router;
