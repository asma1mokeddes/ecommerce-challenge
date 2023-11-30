import express from "express";
import { reset, activate } from "../routes/emailsRoutes.js";

const router = express.Router();

router.post("/activate", activate);
router.post("/reset-password", reset);

export default router;
