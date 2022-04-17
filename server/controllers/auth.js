import User from "../models/user";
import jwt from "jsonwebtoken";

import { hashPassword, verifyPassword } from "../utils/auth";

export const register = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    // Validation of User Data
    if (!userName) return res.status(400).send("User Name is Required");
    if (!email) return res.status(400).send("Email is Required");
    if (!password || password.length < 6) return res.status(400).send("Password must be at least 6 characters long");

    // Checking if USer Exists and handling Error
    const isUserExist = await User.findOne({ email }).exec();
    if (isUserExist) return res.status(400).send("Email is already is in use");

    // Hashing Password using hasPassword utils Function
    const hashedPassword = await hashPassword(password);

    // register user
    const user = new User({
      userName,
      email,
      password: hashedPassword,
    });

    await user.save();

    console.log("save user", user);
    return res.json({ message: "User Created", user });
  } catch (error) {
    console.log(error);
    return res.status(404).send("Error with Something");
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(email, password);

    // Validation incoming data
    if (!email) return res.status(400).send("Please Enter Your Email");
    if (!password) return res.status(400).send("Please Enter Your Password");

    // check if user exists and validating
    const user = await User.findOne({ email }).exec();
    if (!user) return res.status(400).send("User email not found");

    // Match Password by bcrypt
    const match = await verifyPassword(password, user.password);
    if (!match) return res.status(400).send("Password is incorrect");

    // Generate JWT Token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    user.password = undefined;

    res.cookie("token", token, {
      httpOnly: true,
      // secure: true, // Only For Https
    });

    return res.json({ user, message: "Successfully Logged in" });
  } catch (error) {
    console.log(error);

    res.status(400).send("Error");
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");

    return res.send("Logged Out!");
  } catch (error) {
    confirm.log(error);
    res.status(400).send("Something Went Wrong!");
  }
};
