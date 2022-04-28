import expressJwt from "express-jwt";
import User from "../models/user";

export const verifyToken = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  getToken: (req, res) => req.cookies.token,
});
