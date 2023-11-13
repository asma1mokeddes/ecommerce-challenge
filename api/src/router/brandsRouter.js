import express from "express";
import {
    getBrands,
    createBrand,
    getBrand,
    updateBrand,
    deleteBrand,
} from "../routes/brandsRoutes.js";
import userManagementMiddleware from "../middlewares/userManagementMiddleware.js";

const router = express.Router();

router.get("/", getBrands); // Obtenir toutes les marques
router.get("/:brandId", getBrand); // Obtenir une marque par ID
router.post("/", userManagementMiddleware, createBrand); // Créer une nouvelle marque
router.put("/:brandId", updateBrand); // Mettre à jour une marque par ID
router.delete("/:brandId", deleteBrand); // Supprimer une marque par ID

export default router;
