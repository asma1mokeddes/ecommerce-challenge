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

// Le magasinier ne peut pas accéder à cette partie là de l'app
// géré par le middleware
router.get("/", getUsers);
router.get("/:id", authMiddleware, userManagementMiddleware, getUser);
router.post("/", createUser);
router.put("/:id", authMiddleware, userManagementMiddleware, updateUser);
router.delete("/:id", authMiddleware, deleteUser);

export default router;
