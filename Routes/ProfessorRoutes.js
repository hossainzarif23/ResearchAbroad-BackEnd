import express from "express";
import ProfessorController from "../Controllers/ProfessorController.js";

const router = express.Router();
const professorController = new ProfessorController();

router.post("/", professorController.getProfessor);
router.post("/matchinginterests", professorController.getCommonInterests);

export default router;