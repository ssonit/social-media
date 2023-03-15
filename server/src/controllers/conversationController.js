import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";

const conversationController = {
  createConversation: async (req, res) => {
    try {
      const { members, name } = req.body;

      if (members.length === 2) {
        const conversation = await Conversation.findOne({
          members,
          name,
        });
        if (conversation) return;
      }

      const newConversation = new Conversation({
        name,
        members,
      });

      const data = await newConversation.save();

      return res.status(200).json({
        msg: "Create conversation",
        data,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getConversations: async (req, res) => {
    try {
      const { userId } = req.params;

      const conversations = await Conversation.find({
        members: userId,
      })
        .populate("members", "fullname username avatar")
        .sort("updatedAt");

      const conversationList = conversations.map((item) => item._id);

      const data = await Message.aggregate([
        { $match: { conversationId: { $in: conversationList } } },
        { $sort: { timestamp: -1 } },
        { $group: { _id: "$conversationId", message: { $last: "$$ROOT" } } },
        { $sort: { "message.timestamp": -1 } },
      ]);

      const results = data
        .sort(
          (a, b) =>
            new Date(b.message.createdAt).getTime() -
            new Date(a.message.createdAt).getTime()
        )
        .map((item) => {
          const conversation = conversations.find(
            (i) => i._id.toString() === item._id.toString()
          );
          return {
            ...conversation._doc,
            latestMessage: item.message.text,
          };
        });

      return res.status(200).json({
        msg: "Get conversations",
        data: results,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

export default conversationController;
