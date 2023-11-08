import express from "express";
import { emailing } from "../routes/emailRoutes.js";

const router = express.Router();

router.post("/", emailing);

export default router;
