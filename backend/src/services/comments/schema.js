
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

const commentSchema = new Schema(
    {
        comment: { type: String },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        task: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Task",
        },
        reactions: { default: [], type: [reactionsSchema] },
    },
    { timestamps: true }
);

export default model("Comment", commentSchema);
