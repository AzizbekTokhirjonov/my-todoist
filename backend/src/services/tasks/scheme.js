import mongoose from "mongoose";

const { Schema, model } = mongoose;

// **** TODO: TO BE DELETED!
// const reactionsSchema = new Schema({
//   author: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true,
//     ref: "User",
//   },
//   reactionType: { type: String },
// });

// const subTaskScheme = new Schema(
//   {
//     title: { type: String, required: true },
//     description: { type: String, required: true },
//     owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
//     projectId: [{ type: Schema.Types.ObjectId, ref: "Project" }],
//     label: { type: Schema.Types.ObjectId, ref: "Label" },
//     priority: {
//       type: String,
//       default: "Low",
//       enum: ["Low", "Medium", "High", "Critical", "Dream"],
//     },
//     dueDate: { type: Date },
//   },
//   { timestamps: true }
// );

// **** TODO: TO BE DELETED!
// const commentSchema = new Schema(
//   {
//     comment: { type: String },
//     author: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true,
//       ref: "User",
//     },
//     reactions: { default: [], type: [reactionsSchema] },
//   },
//   { timestamps: true }
// );
const TaskSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String},
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    projectId: { type: Schema.Types.ObjectId, ref: "Project" },
    assignedTo: { type: Schema.Types.ObjectId, ref: "User" },
    watchers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    label: { type: Schema.Types.ObjectId, ref: "Label" },
    priority: {
      type: String,
      default: "Low",
      enum: ["Low", "Medium", "High", "Critical", "Dream"],
    },
    subTasks: [{ type: Schema.Types.ObjectId, ref: "SubTask" }],
    dueDate: { type: Date },
  },
  { timestamps: true }
);

export default model("Task", TaskSchema);
