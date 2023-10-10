import express from "express";
import { getUsers } from "../routes/usersRoutes.js";

const router = express.Router();

router.get("/", getUsers);

export default router;
