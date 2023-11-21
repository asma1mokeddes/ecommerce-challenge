import express from "express";
import { register, login, logout } from "../routes/authRoutes.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", authMiddleware, logout); // ? pourquoi authMiddleware ici ?

export default router;
