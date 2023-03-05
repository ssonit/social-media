import Message from "../models/Message.js";

const messageController = {
  createMessage: async (req, res) => {
    try {
      const { conversationId, sender, text } = req.body;

      const newMessage = new Message({
        conversationId,
        sender,
        text,
      });

      const data = await newMessage.save();

      return res.status(200).json({
        msg: "Create message",
        data,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getMessages: async (req, res) => {
    try {
      const { conversationId } = req.params;

      const data = await Message.find({ conversationId });

      return res.status(200).json({
        msg: "Get messages",
        data,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

export default messageController;
