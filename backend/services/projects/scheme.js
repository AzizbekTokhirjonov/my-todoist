import mongoose from "mongoose";

const { Schema, model } = mongoose;

const TaskSchema = new Schema(
  {
    name: { type: String, required: true },
    color: { type: String, required: true },
    favorite: { type: Boolean, default: false },
    taskList: [{ type: Schema.Types.ObjectId, ref: "Task" }],
    projectOwnerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    collaborators: [{ type: Schema.Types.ObjectId, ref: "User" }],
    invitees: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export default model("Task", TaskSchema);
