import Post from "../models/Post.js";
import User from "../models/User.js";

const postController = {
  getAllPosts: async (req, res) => {
    try {
      const posts = await Post.find({}).populate({
        path: "userId likes",
        select: "avatar fullname username",
      });

      return res.status(200).json({
        msg: "All posts",
        data: posts,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  createNewPost: async (req, res) => {
    try {
      const { description, images } = req.body;

      if (images.length === 0)
        return res.status(400).json({ msg: "Please add your photo." });

      const newPost = new Post({
        description,
        images,
        userId: req.user.id,
      });

      const results = await (
        await newPost.save()
      ).populate({
        path: "userId likes",
        select: "avatar fullname username",
      });

      // await User.findByIdAndUpdate(req.user.id, {
      //   $push: { posts: results._id },
      // });

      return res.status(200).json({
        msg: "Create new post success",
        data: results,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updatePost: async (req, res) => {
    try {
      const { description, images } = req.body;
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        {
          description,
          images,
        },
        { new: true }
      ).populate("userId likes", "avatar username fullname");
      return res.status(200).json({
        msg: "Update post success",
        data: updatedPost,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  savedPost: async (req, res) => {
    try {
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

export default postController;
