import express from "express";
import {
    getCategories,
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory,
} from "../routes/categoriesRoutes.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getCategories); // Obtenir toutes les catégories
router.get("/:id", getCategory); // Obtenir une catégorie par ID
router.post("/", authMiddleware, createCategory); // Créer une nouvelle catégorie
router.put("/:id", authMiddleware, updateCategory); // Mettre à jour une catégorie par ID
router.delete("/:id", authMiddleware, deleteCategory); // Supprimer une catégorie par ID

export default router;
