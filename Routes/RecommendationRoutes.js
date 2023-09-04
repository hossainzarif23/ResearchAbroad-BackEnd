import express from "express";
import RecommendationController from "../Controllers/RecommendationController.js";

const router = express.Router();
const recommendationController = new RecommendationController();

router.post("/", recommendationController.recommend)
router.post("/interests", recommendationController.fetchInterests);

export default router;