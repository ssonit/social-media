import Post from "../models/Post.js";
import User from "../models/User.js";

const LIMIT = 10;

const postController = {
  getAllPosts: async (req, res) => {
    try {
      const { page, limit } = req.query;
      const page_size = parseInt(limit) || LIMIT;
      let posts = [];
      if (page) {
        const skip = (parseInt(page) - 1) * page_size;
        posts = await Post.find({})
          .sort({ createdAt: -1 })
          .populate({
            path: "userId likes",
            select: "avatar fullname username",
          })
          .populate({
            path: "comments",
            populate: {
              path: "user likes",
              select: "avatar fullname username",
            },
          })
          .skip(skip)
          .limit(page_size);
      } else {
        posts = await Post.find({})
          .sort({ createdAt: -1 })
          .populate({
            path: "userId likes",
            select: "avatar fullname username",
          })
          .populate({
            path: "comments",
            populate: {
              path: "user likes",
              select: "-password",
            },
          })
          .limit(page_size);
      }
      return res.status(200).json({
        msg: "All posts",
        data: posts,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getPost: async (req, res) => {
    try {
      const postId = req.params.postId;

      const data = await Post.findById(postId)
        .sort({ createdAt: -1 })
        .populate({
          path: "userId likes",
          select: "avatar fullname username",
        })
        .populate({
          path: "comments",
          populate: {
            path: "user likes",
            select: "avatar fullname username",
          },
        });

      if (!data)
        return res.status(400).json({ msg: "This post does not exist" });

      return res.status(200).json({
        msg: "Get post",
        data,
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
      const { postId } = req.params;

      const saved = await User.findOne({ _id: req.user.id, saved: postId });
      if (saved) {
        const data = await User.findByIdAndUpdate(
          req.user.id,
          {
            $pull: {
              saved: postId,
            },
          },
          { new: true }
        );
        return res.status(200).json({
          msg: "Remove post",
          data: data.saved,
        });
      } else {
        const data = await User.findByIdAndUpdate(
          req.user.id,
          {
            $push: {
              saved: postId,
            },
          },
          { new: true }
        );
        return res.status(200).json({
          msg: "Add post",
          data: data.saved,
        });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getPostsUser: async (req, res) => {
    try {
      const userId = req.params.userId;
      const { page, limit } = req.query;
      const page_size = parseInt(limit) || LIMIT;
      const skip = (parseInt(page) - 1) * page_size;

      const posts = await Post.find({ userId: userId })
        .skip(skip)
        .limit(page_size);

      return res.status(200).json({
        msg: "Get Posts",
        data: posts,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getPostsExplore: async (req, res) => {
    try {
      const user = await User.findById(req.user.id);

      const data = await Post.find({
        userId: [
          ...user.followings.map((item) => item.toString()),
          req.user.id,
        ],
      });

      return res.status(200).json({
        msg: "Get posts explore",
        data,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getPostsSaved: async (req, res) => {
    try {
      const { userId } = req.params;

      const user = await User.findById(userId);

      const data = await Post.find({
        _id: { $in: user.saved.map((item) => item.toString()) },
      });

      return res.status(200).json({
        msg: "Get posts saved",
        data,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  likePost: async (req, res) => {
    try {
      const userId = req.user.id;
      const postId = req.params.postId;

      const post = await Post.findOne({ _id: postId, likes: userId });
      if (post)
        return res.status(400).json({
          msg: "You liked this post",
        });

      const newPost = await Post.findByIdAndUpdate(
        postId,
        {
          $push: { likes: userId },
        },
        { new: true }
      );
      return res.status(200).json({
        msg: "Like post",
        data: newPost,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  unLikePost: async (req, res) => {
    try {
      const userId = req.user.id;
      const postId = req.params.postId;

      const newPost = await Post.findByIdAndUpdate(
        postId,
        {
          $pull: { likes: userId },
        },
        { new: true }
      );
      return res.status(200).json({
        msg: "UnLike post",
        data: newPost,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  deletePost: async (req, res) => {
    try {
      const { postId } = req.params;

      const post = await Post.findById(postId);

      if (post.userId.toString() !== req.user.id)
        return res.status(400).json({
          msg: "You can't delete this post",
        });

      const data = await Post.findByIdAndDelete(postId);
      return res.status(200).json({
        msg: "Delete post success",
        data,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

export default postController;
