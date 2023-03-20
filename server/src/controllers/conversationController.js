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
        }).populate("members", "fullname username avatar");

        if (conversation) {
          return res.status(200).json({
            msg: "Conversation have exist",
            data: {
              ...conversation._doc,
              latestMessage: {
                text: "",
                createdAt: new Date(),
              },
            },
          });
        }
      }

      const newConversation = new Conversation({
        name,
        members,
      });

      const data = await (
        await newConversation.save()
      ).populate("members", "fullname username avatar");

      return res.status(200).json({
        msg: "Create conversation",
        data: {
          ...data._doc,
          latestMessage: {
            text: "You are currently connected to this user",
            createdAt: new Date(),
          },
        },
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  createMultiConversation: async (req, res) => {
    try {
      const { users, currentUserId } = req.body; // users = [{ id: string, name: string}]

      const members = users.map((item) => {
        return {
          members: [currentUserId, item.id],
          name: item.name,
        };
      });

      const data = await Conversation.insertMany(members);

      return res.status(200).json({
        msg: "Create multi conversation",
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

      const results = conversations
        .map((item) => {
          const message = data.find(
            (i) => i._id.toString() === item._id.toString()
          );

          if (message) {
            return {
              ...item._doc,
              latestMessage: {
                text: message.message.text,
                createdAt: message.message.createdAt,
              },
            };
          } else {
            return {
              ...item._doc,
              latestMessage: {
                text: "You are currently connected to this user",
                createdAt: item.createdAt,
              },
            };
          }
        })
        .sort(
          (a, b) =>
            new Date(b.latestMessage.createdAt).getTime() -
            new Date(a.latestMessage.createdAt).getTime()
        );

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
