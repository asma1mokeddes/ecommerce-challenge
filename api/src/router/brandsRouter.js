import express from 'express';
import { getBrands, createBrand, getBrand, updateBrand, deleteBrand } from '../routes/brandsRoutes.js';

const router = express.Router();

router.get("/", getBrands); // Obtenir toutes les marques
router.post("/", createBrand); // Créer une nouvelle marque
router.get('/:id', getBrand); // Obtenir une marque par ID
router.put('/:id', updateBrand); // Mettre à jour une marque par ID
router.delete('/:id', deleteBrand); // Supprimer une marque par ID

export default router;
