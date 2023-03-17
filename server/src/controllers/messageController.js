import Message from "../models/Message.js";

const LIMIT = 10;

const messageController = {
  createMessage: async (req, res) => {
    try {
      const { conversationId, sender, text } = req.body;

      const newMessage = new Message({
        conversationId,
        sender,
        text,
      });

      const data = await (
        await newMessage.save()
      ).populate("sender", "fullname username avatar");

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
      const { page, limit } = req.query;
      const page_size = parseInt(limit) || LIMIT;

      const skip = (parseInt(page) - 1) * page_size;

      const data = await Message.find({ conversationId })
        .populate("sender", "fullname username avatar")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(page_size);

      return res.status(200).json({
        msg: "Get messages",
        data,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  deleteMessage: async (req, res) => {
    try {
      const { messageId } = req.params;

      await Message.findByIdAndDelete(messageId);

      return res.status(200).json({
        msg: "Delete message",
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

export default messageController;
