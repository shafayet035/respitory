import User from "../models/user";

export const currentUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).select("-password").exec();
    return res.json({ isAuthorized: true, user });
  } catch (error) {
    return res.json({ isAuthorized: false });
  }
};
