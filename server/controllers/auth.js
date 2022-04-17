import User from "../models/user";

import { hashPassword, verifyPassword } from "../utils/auth";

export const register = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    if (!userName) return res.status(400).send("User Name is Required");
    if (!email) return res.status(400).send("Email is Required");
    if (!password || password.length < 6) return res.status(400).send("Password must be at least 6 characters long");
  } catch (error) {
    console.log(error);
    return res.status(404).send("Error with Something");
  }
};
