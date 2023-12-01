import express from "express";
import {
    getOrders,
    createOrder,
    getOrder,
    updateOrder,
    deleteOrder,
} from "../routes/categoriesRoutes.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { adminOrStoreKeeperMiddleware } from "../middlewares/userManagementMiddleware.js";

const router = express.Router();

router.get("/", getOrders); 
router.get("/:orderId", getOrder);
router.post("/", authMiddleware, adminOrStoreKeeperMiddleware, createOrder); 
router.put(
    "/:orderId",
    authMiddleware,
    adminOrStoreKeeperMiddleware,
    updateOrder
); 
router.delete(
    "/:orderId",
    authMiddleware,
    adminOrStoreKeeperMiddleware,
    deleteOrder
);

export default router;
