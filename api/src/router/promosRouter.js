import express from 'express';
import {
  getPromos,
  createPromo,
  getPromo,
  updatePromo,
  deletePromo
} from '../routes/promosRoutes.js';

const router = express.Router();

router.get('/', getPromos); // Obtenir toutes les promotions
router.post('/', createPromo); // Créer une nouvelle promotion
router.get('/:id', getPromo); // Obtenir une promotion par ID
router.put('/:id', updatePromo); // Mettre à jour une promotion par ID
router.delete('/:id', deletePromo); // Supprimer une promotion par ID

export default router;
