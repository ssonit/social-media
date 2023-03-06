import Conversation from "../models/Conversation.js";

const conversationController = {
  createConversation: async (req, res) => {
    try {
      const { members, name } = req.body;

      // if(members.length === 2) {
      //   const existingConversation = await Conversation.findOne({ members: { $all: members } });

      //   return res.status(400).json({ msg: "This conversation have exist", data:  });
      // }

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

      const data = await Conversation.find({ members: userId }).populate(
        "members",
        "fullname username avatar"
      );

      return res.status(200).json({
        msg: "Get conversations",
        data,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

export default conversationController;
