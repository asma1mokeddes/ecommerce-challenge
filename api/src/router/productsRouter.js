import express from "express";
import {
    getProducts,
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct,
} from "../routes/productsRoutes.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", createProduct);
router.get("/:productId", getProduct);
router.put("/:productId", updateProduct);
router.delete("/:productId", deleteProduct);

export default router;
