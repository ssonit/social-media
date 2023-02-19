import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

const commentController = {
  createComment: async (req, res) => {
    try {
      const { postId, content, reply, tag, postUserId } = req.body;

      const post = await Post.findById(postId);
      if (!post)
        return res.status(400).json({ msg: "This post does not exist" });

      if (reply) {
        const cm = await Comment.findById(reply);
        if (!cm)
          return res.status(400).json({ msg: "This comment does not exist." });
      }

      const newComment = new Comment({
        content,
        postId,
        postUserId,
        reply,
        tag,
        user: req.user.id,
      });

      await Post.findByIdAndUpdate(postId, {
        $push: {
          comments: newComment._id,
        },
      });

      await (
        await newComment.save()
      ).populate({
        path: "user likes",
        select: "avatar fullname username",
      });

      return res.status(200).json({
        msg: "Create comment success",
        data: newComment,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updateComment: async (req, res) => {
    try {
      const { content } = req.body;
      const commentId = req.params.commentId;

      const comment = await Comment.findByIdAndUpdate(
        commentId,
        {
          content,
        },
        { new: true }
      );

      return res.status(200).json({
        msg: "Update comment success",
        data: comment,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  deleteComment: async (req, res) => {
    try {
      const { postId } = req.body;
      const commentId = req.params.commentId;

      const post = await Post.findById(postId);
      if (!post)
        return res.status(400).json({ msg: "This post does not exist" });

      await Comment.findByIdAndDelete(commentId);
      await Post.findByIdAndUpdate(postId, {
        $pull: {
          comments: commentId,
        },
      });
      return res.status(200).json({
        msg: "Delete comment success",
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

export default commentController;
