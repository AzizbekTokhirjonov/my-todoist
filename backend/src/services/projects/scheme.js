import mongoose from "mongoose";

const { Schema, model } = mongoose;

const SectionSchema = new Schema({
  title: { type: String, required: true },
  tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
});
const ProjectSchema = new Schema(
  {
    name: { type: String, required: true },
    color: { type: String, required: true },
    favorite: { type: Boolean, default: false },
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
    projectOwner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    collaborators: [{ type: Schema.Types.ObjectId, ref: "User" }],
    invitees: [{ type: Schema.Types.ObjectId, ref: "User" }],
    sections: { default: [], type: [SectionSchema] },
  },
  { timestamps: true }
);

export default model("Project", ProjectSchema);
