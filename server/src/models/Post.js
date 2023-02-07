import mongoose from "mongoose";

const Post = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    images: [
      {
        type: String,
        default: "",
        required: true,
      },
    ],
    description: {
      type: String,
    },
    likes: [
      {
        type: mongoose.Types.ObjectId,
        ref: "user",
      },
    ],
    comments: [
      {
        type: mongoose.Types.ObjectId,
        ref: "comment",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("post", Post);
