import express from "express";
import authenticationRoutes from "./AuthenticationRoutes.js";
import recommendationRoutes from "./RecommendationRoutes.js";
import shortListRoutes from "./ShortListRoutes.js";

const router = express.Router();

router.use("/authentication", authenticationRoutes);
router.use("/recommendation", recommendationRoutes);
router.use("/shortlist", shortListRoutes);

export default router;