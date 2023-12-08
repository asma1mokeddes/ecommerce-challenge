import express from "express";

import { 
    getPayments,
    getPayment,
    createPayment,
    getStripeSession,
    purchaseSuccess,
    purchaseFailed
} from "../routes/paymentRoutes.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getPayments);
router.get("/success", purchaseSuccess);
router.get("/failed", purchaseFailed);
router.get("/session/:session", getStripeSession);
router.get("/:id", getPayment);
router.post("/", createPayment);

export default router;