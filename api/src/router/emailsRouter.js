import express from "express";
import { reset, activate } from "../routes/emailsRoutes.js";

const router = express.Router();

router.get("/activate", activate);
router.post("/reset-password", reset);

export default router;
