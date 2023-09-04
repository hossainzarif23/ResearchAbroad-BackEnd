import express from "express";
import ShortListController from "../Controllers/ShortListController.js";

const router = express.Router();
const shortListController = new ShortListController();

router.post("/add", shortListController.addToShortList);
router.post("/remove", shortListController.removeFromShortList);
router.post("/check", shortListController.isShortlisted);

export default router;