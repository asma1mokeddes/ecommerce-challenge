import express from "express";
import {
    getProducts,
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct,
    searchProducts,
} from "../routes/productsRoutes.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { adminOrStoreKeeperMiddleware } from "../middlewares/userManagementMiddleware.js";
import { upload } from "../middlewares/upload.js";

const router = express.Router();

router.get("/search", searchProducts);

router.get("/:productId", getProduct);

router.get("/", getProducts);
router.post(
    "/create",
    authMiddleware,
    adminOrStoreKeeperMiddleware,
    upload.single("image"),
    createProduct
);
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
