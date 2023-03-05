import Conversation from "../models/Conversation.js";

const conversationController = {
  createConversation: async (req, res) => {
    try {
      const { members, name } = req.body;

      if (members.length < 2)
        return res.status(400).json({ msg: "Can not create conversation" });

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

      const data = await Conversation.find({ members: userId });

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
