import epxress from "express";
import { sendPasswordCode } from "../controllers/email";
import { verifyToken } from "../middlewares";

const router = epxress.Router();

router.get("/forgot-password", verifyToken, sendPasswordCode);

module.exports = router;
