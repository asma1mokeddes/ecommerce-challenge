import express from "express";
import {
    getUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser,
} from "../routes/usersRoutes.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", createUser);
router.put("update/:id", authMiddleware, updateUser);
router.delete("delete/:id", authMiddleware, deleteUser);

export default router;
