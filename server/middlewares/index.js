import expressJwt from "express-jwt";

export const getVerifiedUser = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  getToken: (req, res) => req.cookies.token,
});
