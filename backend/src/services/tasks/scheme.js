import mongoose from "mongoose";

const { Schema, model } = mongoose;

const reactionsSchema = new Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  reactionType: { type: String },
});

const subTaskScheme = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    projectId: [{ type: Schema.Types.ObjectId, ref: "Project" }],
    label: { type: Schema.Types.ObjectId, ref: "Label" },
    priority: {
      type: String,
      default: "Low",
      enum: ["Low", "Medium", "High", "Critical", "Dream"],
    },
    dueDate: { type: Date },
  },
  { timestamps: true }
);
const commentSchema = new Schema(
  {
    comment: { type: String },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    reactions: { default: [], type: [reactionsSchema] },
  },
  { timestamps: true }
);
const TaskSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    projectId: [{ type: Schema.Types.ObjectId, ref: "Project" }],
    sectionId: [{ type: Schema.Types.ObjectId, ref: "Section" }],
    assignedTo: { type: Schema.Types.ObjectId, ref: "User" },
    watchers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    label: { type: Schema.Types.ObjectId, ref: "Label" },
    priority: {
      type: String,
      default: "Low",
      enum: ["Low", "Medium", "High", "Critical", "Dream"],
    },
    comments: { default: [], type: [commentSchema] },
    subTasks: { default: [], type: [subTaskScheme] },
    dueDate: { type: Date },
  },
  { timestamps: true }
);

export default model("Task", TaskSchema);
