import express from "express";
import {
    getUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser,
} from "../routes/usersRoutes.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { adminMiddleware } from "../middlewares/userManagementMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, adminMiddleware, getUsers);
router.get("/:userId", authMiddleware, adminMiddleware, getUser);
router.post("/create", authMiddleware, adminMiddleware, createUser);
router.put("update/:userId", authMiddleware, adminMiddleware, updateUser);
router.delete("/:userId", authMiddleware, adminMiddleware, deleteUser);

export default router;
