import express from "express";
import {
    getProduits,
    createProduit,
    getProduit,
    updateProduit,
    deleteProduit,
} from "../routes/productssRoutes.js";

const router = express.Router();

router.get("/", getProduits);
router.post("/", createProduit);
router.get("/:id", getProduit);
router.post("/:id", updateProduit);
router.delete("/:id", deleteProduit);

export default router;
