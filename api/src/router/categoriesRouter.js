import express from 'express';
import { getCategories, createCategory, getCategory, updateCategory, deleteCategory } from '../routes/categoriesRoutes.js';

const router = express.Router();

router.get("/", getCategories); // Obtenir toutes les catégories
router.post("/", createCategory); // Créer une nouvelle catégorie
router.get('/:id', getCategory); // Obtenir une catégorie par ID
router.put('/:id', updateCategory); // Mettre à jour une catégorie par ID
router.delete('/:id', deleteCategory); // Supprimer une catégorie par ID

export default router;
