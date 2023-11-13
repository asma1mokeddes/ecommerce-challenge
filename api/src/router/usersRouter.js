import express from "express";
import {
    getUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser,
} from "../routes/usersRoutes.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import userManagementMiddleware from "../middlewares/userManagementMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, userManagementMiddleware, getUsers);
router.get("/:userId", authMiddleware, userManagementMiddleware, getUser);
router.post("/", authMiddleware, userManagementMiddleware, createUser);
router.put("/:userId", authMiddleware, userManagementMiddleware, updateUser);
router.delete("/:userId", authMiddleware, userManagementMiddleware, deleteUser);

export default router;
