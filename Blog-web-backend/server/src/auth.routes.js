import express from "express";
import auth from "./auth.js";
import { register, login, me } from "./auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", auth, me);

export default router;
