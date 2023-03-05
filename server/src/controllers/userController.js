import cloudinary from "../configs/cloudinary.js";
import User from "../models/User.js";

const userController = {
  getSearchUser: async (req, res) => {
    try {
      const users = await User.find({
        username: { $regex: req.query.username },
      })
        .limit(10)
        .select("avatar fullname username");
      if (!users) return res.status(400).json({ msg: "Not found" });
      return res.status(200).json({ msg: "Username", data: users });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id)
        .select("-password")
        .populate("followers followings", "_id fullname username avatar");

      if (!user)
        return res.status(400).json({ msg: "This user is not exists" });
      return res.status(200).json({
        data: user,
        msg: "Get user success",
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getSuggestionsUser: async (req, res) => {
    try {
      const { id } = req.params;

      const user = await User.findById(id);

      // const data = await User.aggregate([
      //   { $match: { _id: { $nin: [...user.followings, id] } } },
      //   { $sample: { size: 10 } },
      //   {
      //     $lookup: {
      //       from: "user",
      //       localField: "followers",
      //       foreignField: "_id",
      //       as: "followers",
      //     },
      //   },
      //   {
      //     $lookup: {
      //       from: "user",
      //       localField: "followings",
      //       foreignField: "_id",
      //       as: "followings",
      //     },
      //   },
      // ]).project("-password");

      const data = await User.find({
        _id: { $nin: [...user.followings, id] },
      }).select("-password");

      return res.status(200).json({
        msg: "Get suggestion user",
        data,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updateUser: async (req, res) => {
    try {
      const {
        fullname,
        username,
        gender,
        mobile,
        address,
        story,
        website,
        avatar,
      } = req.body;

      const id = req.user.id;

      const updatedUser = await User.findByIdAndUpdate(
        id,
        {
          fullname,
          username,
          gender,
          mobile,
          address,
          story,
          website,
          avatar,
        },
        {
          new: true,
        }
      );

      const results = await updatedUser.populate(
        "followers followings",
        "avatar fullname username"
      );

      return res.status(200).json({
        msg: "Update user success",
        data: results,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  followUser: async (req, res) => {
    try {
      const currentUserId = req.user.id;
      const userId = req.params.id;

      const user = await User.findById(currentUserId);

      if (user.followings.includes(userId))
        return res.status(500).json({ msg: "You followed this user" });

      await User.findByIdAndUpdate(
        currentUserId,
        {
          $push: { followings: userId },
        },
        { new: true }
      );

      await User.findByIdAndUpdate(
        userId,
        {
          $push: { followers: currentUserId },
        },
        { new: true }
      );

      return res.status(200).json({
        msg: "Follow user",
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  unfollowUser: async (req, res) => {
    try {
      const currentUserId = req.user.id;
      const userId = req.params.id;

      const user = await User.findById(currentUserId);

      if (!user.followings.includes(userId))
        return res.status(500).json({
          msg: "You haven't followed this user",
        });

      await User.findByIdAndUpdate(
        currentUserId,
        {
          $pull: { followings: userId },
        },
        { new: true }
      );

      await User.findByIdAndUpdate(
        userId,
        {
          $pull: { followers: currentUserId },
        },
        { new: true }
      );

      return res.status(200).json({
        msg: "Unfollow user",
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

export default userController;
