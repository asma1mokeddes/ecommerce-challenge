import express from "express";
import {
    getCategories,
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory,
} from "../routes/categoriesRoutes.js";

const router = express.Router();

router.get("/", getCategories); // Obtenir toutes les catégories
router.get("/:categoryId", getCategory); // Obtenir une catégorie par ID
router.post("/", createCategory); // Créer une nouvelle catégorie
router.put("/:categoryId", updateCategory); // Mettre à jour une catégorie par ID
router.delete("/:categoryId", deleteCategory); // Supprimer une catégorie par ID

export default router;
