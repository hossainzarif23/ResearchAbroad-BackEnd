import express from "express";
import authenticationRoutes from "./AuthenticationRoutes.js";
import recommendationRoutes from "./RecommendationRoutes.js";
import shortListRoutes from "./ShortListRoutes.js";
import professorRoutes from "./ProfessorRoutes.js"
import professorExplorationRoutes from "./ProfessorExplorationRoutes.js";
import universityExplorationRoutes from "./UniversityExplorationRoutes.js";
import universityRoutes from "./UniversityRoutes.js";

const router = express.Router();

router.use("/authentication", authenticationRoutes);
router.use("/recommendation", recommendationRoutes);
router.use("/shortlist", shortListRoutes);
router.use("/professor", professorRoutes);
router.use("/exploreprofessor", professorExplorationRoutes);
router.use("/exploreuniversity", universityExplorationRoutes);
router.use("/university", universityRoutes);

export default router;