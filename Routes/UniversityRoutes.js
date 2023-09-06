import express from "express";
import UniversityController from "../Controllers/UniversityController.js";

const router = express.Router();
const universityController = new UniversityController();

router.post("/", universityController.getUniversity);

export default router;