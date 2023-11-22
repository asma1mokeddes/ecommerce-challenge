import express from "express";
import { sendActivatedAccountEmail, reset } from "../routes/emailsRoutes.js";

const router = express.Router();

router.post("/activate", sendActivatedAccountEmail);
router.post("/reset-password", reset);

export default router;
