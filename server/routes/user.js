import epxress from "express";
import { currentUser } from "../controllers/user";
import { verifyToken } from "../middlewares";

const router = epxress.Router();

router.get("/current-user", verifyToken, currentUser);

module.exports = router;
