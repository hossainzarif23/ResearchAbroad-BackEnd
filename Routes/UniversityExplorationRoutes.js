import express from "express";
import UniversityExplorationController from "../Controllers/UniversityExplorationController.js";

const router = express.Router();
const universityExplorationController = new UniversityExplorationController();

router.post("/", universityExplorationController.exploreUniversities);

export default router;