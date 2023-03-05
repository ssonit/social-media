import mongoose from "mongoose";

const Message = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Types.ObjectId,
      ref: "conversation",
    },
    text: {
      type: String,
    },
    sender: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("message", Message);
