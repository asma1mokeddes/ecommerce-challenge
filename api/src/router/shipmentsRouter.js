import express from "express";
import {
    createShipment,
} from "../routes/shipmentsRoutes.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();


router.post("/", createShipment); // authMiddleware, 

export default router;