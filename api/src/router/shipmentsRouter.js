import express from "express";
import { createShipment, trackShipment } from '../routes/shipmentsRoutes.js';
import authMiddleware from "../middlewares/authMiddleware.js";
import { adminMiddleware } from "../middlewares/userManagementMiddleware.js";

const router = express.Router();

router.post('/', createShipment);
router.get('/:id', trackShipment);

export default router;