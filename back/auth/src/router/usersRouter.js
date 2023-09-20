import express from "express";
import { addTeacherInfoToGrades, getUsers } from "../routes/usersRoutes.js";

const router = express.Router();

router.get("/", getUsers);

export default router;
