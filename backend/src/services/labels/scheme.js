import mongoose from "mongoose";

const { Schema, model } = mongoose;

const LabelSchema = new Schema(
  {
    title: { type: String, required: true },
    color: { type: String, required: true },
    favorite: { type: Boolean, default: false },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default model("Label", LabelSchema);
