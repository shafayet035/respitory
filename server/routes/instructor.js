import epxress from "express";
import { createInstructor, getInstructor } from "../controllers/instructor";
import { verifyToken } from "../middlewares";

const router = epxress.Router();

router.post("/create-instructor", verifyToken, createInstructor);

router.get("/get-instructor", verifyToken, getInstructor);

module.exports = router;
