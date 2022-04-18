import User from "../models/user";

export const currentUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).select("-password").exec();
    if (!user) return res.json({ isAuthorized: false });
    return res.json({ isAuthorized: true });
  } catch (error) {
    if (error) return res.status(400).send("Unathorized User");
  }
};
