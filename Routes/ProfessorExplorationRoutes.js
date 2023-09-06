import express from "express";
import ProfessorExplorationController from "../Controllers/ProfessorExplorationController.js";

const router = express.Router();
const professorExplorationController = new ProfessorExplorationController();

router.post("/", professorExplorationController.exploreProfessor);
router.post("/interests", professorExplorationController.fetchAllInterests);

export default router;