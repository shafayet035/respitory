import express from "express";
import { register, login, logout, forgotPassword, resetPassword } from "../controllers/auth";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;
