import User from "../models/user";

export const createInstructor = async (req, res) => {
  const data = req.body.formData;

  if (!data.contact_number) return res.status(400).send("Contact Number is Required");
  if (!data.billing_address) return res.status(400).send("Billing Address is Required");
  if (!data.payment_gateway) return res.status(400).send("Payment Gateway is Required");
  if (!data.topic) return res.status(400).send("Topic is Required");

  try {
    const user = await User.findById(req.user._id);

    if (user.role.indexOf("instructor") !== -1) return res.status(400).send("You are Already an Instructor");

    const updatedUser = await User.findOneAndUpdate(
      { _id: req.user._id },
      {
        billing_address: data,
        $addToSet: { role: "instructor" },
      },
      {
        returnDocument: "after",
      }
    )
      .select("-password")
      .exec();

    if (!updatedUser) return res.status(400).send("User not Found");

    res.json({ message: "You are now an Instructor", user: updatedUser });
  } catch (error) {
    console.log("Make instructor", error.message);
  }
};

export const getInstructor = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).select("-password").exec();

    if (!user.role.includes("instructor")) return res.status(400).send("You are not an Instructor");

    res.json({ isAuthorized: true, user });
  } catch (error) {
    console.log(error);
    res.json({ isAuthorized: false });
  }
};
