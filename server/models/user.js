import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    userName: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 18,
    },
    profilePicture: {
      type: String,
      default: "https://i.pinimg.com/736x/ba/92/7f/ba927ff34cd961ce2c184d47e8ead9f6.jpg",
    },
    role: {
      type: [String],
      default: ["subscriber"],
      enum: ["subscriber", "instructor", "admin"],
    },
    stripe_acc_id: "",
    stripe_seller: {},
    stripe_session: {},
    password_reset_code: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
