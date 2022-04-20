import epxress from "express";
import { createInstructor } from "../controllers/instructor";
import { verifyToken } from "../middlewares";

const router = epxress.Router();

router.post("/create-instructor", verifyToken, createInstructor);

module.exports = router;
