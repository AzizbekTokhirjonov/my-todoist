import mongoose from "mongoose";

const { Schema, model } = mongoose;

const TaskSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    taskId: { type: String, required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
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
