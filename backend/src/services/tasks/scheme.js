import mongoose from "mongoose";

const { Schema, model } = mongoose;

const commentSchema = new Schema(
  {
    comment: { type: String },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    // reactions: { default: [], type: [reactionsSchema] },
  },
  { timestamps: true }
);

// const reactionsSchema = new Schema({
//   author: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true,
//     ref: "User",
//   },
//   commentId: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true,
//     ref: "Commment",
//   },
// });

const TaskSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    projectId: [{ type: Schema.Types.ObjectId, ref: "Project" }],
    labelId: { type: Schema.Types.ObjectId, ref: "Label" },
    priority: {
      type: String,
      default: "Low",
      enum: ["Low", "Medium", "High", "Critical", "Dream"],
    },
    dueDate: { type: Date },
  },
  { timestamps: true }
);

export default model("Task", TaskSchema);
