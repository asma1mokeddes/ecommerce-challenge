import express from "express";
import {
    getUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser,
} from "../routes/usersRoutes.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/", createUser);
router.get("/:id", getUser);
router.post("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
