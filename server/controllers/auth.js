import User from "../models/user";

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
