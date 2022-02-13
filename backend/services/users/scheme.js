import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail";

const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userId: { type: String, required: true },
    title: { type: String, required: true },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      lowercase: true,
      validate: [isEmail, "Please enter a valid email"],
    },
    password: { type: String, required: [true, "Please enter your password"] },
    profilePicture: { type: String },
  },
  { timestamps: true }
);

export default model("User", UserSchema);
