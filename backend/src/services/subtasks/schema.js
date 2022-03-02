import mongoose from "mongoose";

const { Schema, model } = mongoose;

const subTaskScheme = new Schema(
    {
      title: { type: String, required: true },
      description: { type: String },
      owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
      parentTask: { type: Schema.Types.ObjectId, ref: "Task", required: true },
      projectId: { type: Schema.Types.ObjectId, ref: "Project" },
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

export default model("SubTask", subTaskScheme);
