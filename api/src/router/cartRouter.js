import express from "express";
import {
    getCart,
    addCart,
    deleteCart
} from "../routes/cartRoutes.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/users/:userId/cart", getCart);
router.post("/users/:userId/cart", addCart);
router.delete("/users/:userId/cart/:productId", deleteCart);

export default router;
