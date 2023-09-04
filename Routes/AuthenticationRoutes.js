import express from "express";
import AuthenticationController from "../Controllers/AuthenticationController.js";

const router = express.Router();
const authenticationController = new AuthenticationController();

router.post("/login", authenticationController.login);

export default router;