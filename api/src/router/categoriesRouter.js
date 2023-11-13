import express from "express";
import {
    getCategories,
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory,
} from "../routes/categoriesRoutes.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { adminOrStoreKeeperMiddleware } from "../middlewares/userManagementMiddleware.js";

const router = express.Router();

router.get("/", getCategories); // Obtenir toutes les catégories
router.get("/:categoryId", getCategory); // Obtenir une catégorie par ID
router.post("/", authMiddleware, adminOrStoreKeeperMiddleware, createCategory); // Créer une nouvelle catégorie
router.put(
    "/:categoryId",
    authMiddleware,
    adminOrStoreKeeperMiddleware,
    updateCategory
); // Mettre à jour une catégorie par ID
router.delete(
    "/:categoryId",
    authMiddleware,
    adminOrStoreKeeperMiddleware,
    deleteCategory
); // Supprimer une catégorie par ID

export default router;
