import express from "express";
import {
    getProducts,
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct,
} from "../routes/productsRoutes.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { adminOrStoreKeeperMiddleware } from "../middlewares/userManagementMiddleware.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:productId", getProduct);
router.post("/", authMiddleware, adminOrStoreKeeperMiddleware, createProduct);
router.put(
    "/:productId",
    authMiddleware,
    adminOrStoreKeeperMiddleware,
    updateProduct
);
router.delete(
    "/:productId",
    authMiddleware,
    adminOrStoreKeeperMiddleware,
    deleteProduct
);

export default router;
