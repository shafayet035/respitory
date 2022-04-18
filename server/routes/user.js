import epxress from "express";
import { currentUser } from "../controllers/user";
import { getVerifiedUser } from "../middlewares";

const router = epxress.Router();

router.get("/current-user", getVerifiedUser, currentUser);

module.exports = router;
