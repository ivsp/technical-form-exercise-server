import express from "express";
import { registerCtrl } from "./users.controller.js";

const router = express.Router();

router.route("/register").post(registerCtrl);

export default router;
