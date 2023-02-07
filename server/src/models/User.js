import mongoose from "mongoose";

const User = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
      maxLength: 100,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    avatar: {
      type: String,
      default:
        "dyq35jdkl/image/upload/v1670470288/instagram-clone/avatar_dndzkl.jpg",
    },
    followers: [
      {
        type: mongoose.Types.ObjectId,
        ref: "user",
      },
    ],
    followings: [
      {
        type: mongoose.Types.ObjectId,
        ref: "user",
      },
    ],
    gender: {
      type: String,
      default: "male",
    },
    mobile: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    story: {
      type: String,
      default: "",
    },
    website: {
      type: String,
      default: "",
    },
    posts: [
      {
        type: mongoose.Types.ObjectId,
        ref: "post",
      },
    ],
    saved: [
      {
        type: mongoose.Types.ObjectId,
        ref: "post",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("user", User);
