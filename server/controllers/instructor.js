import User from "../models/user";

export const createInstructor = async (req, res) => {
  const data = req.body.formData;

  if (!data.contact_number) return res.status(400).send("Contact Number is Required");
  if (!data.billing_address) return res.status(400).send("Billing Address is Required");
  if (!data.payment_gateway) return res.status(400).send("Payment Gateway is Required");
  if (!data.topic) return res.status(400).send("Topic is Required");

  try {
    const user = await User.findOneAndUpdate(
      { _id: req.user._id },
      {
        billing_address: data,
        $addToSet: { role: "instructor" },
      }
    )
      .select("-password")
      .exec();

    if (user) return res.json({ message: "You are now an Instructor", user: user });

    res.stats(400).send("User not Found");
  } catch (error) {
    console.log("Make instructor", error.message);
  }
};
