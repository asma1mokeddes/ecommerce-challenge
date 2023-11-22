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

router.get("/", authMiddleware, getUsers);
router.get("/:id", getUser); // TODO: authMiddleware check on if the connected user is the one who want to request his profile
router.post("/", authMiddleware, createUser);
router.put("/:id", authMiddleware, updateUser); // TODO:  authMiddleware check on if the connected user is the one who want to update his profile
router.delete("/:id", authMiddleware, deleteUser);
// router.post("/anonymize/:id", authMiddleware, anonymizeUser);

export default router;
