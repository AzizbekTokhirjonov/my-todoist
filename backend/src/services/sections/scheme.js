import mongoose from "mongoose";

const { Schema, model } = mongoose;

const SectionSchema = new Schema({
  title: { type: String, required: true },
  tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  projectId: {
    type: Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
});

export default model("Section", SectionSchema);
