import express from "express";
import { deleteUserCtrl, registerCtrl } from "./users.controller.js";

const router = express.Router();

router.route("/register").post(registerCtrl);
router.route("/delete").delete(deleteUserCtrl);
export default router;
