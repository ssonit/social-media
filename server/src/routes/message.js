import express from "express";
import middlewareController from "../middlewares/middlewareController.js";
import messageController from "../controllers/messageController.js";

const router = express.Router();

// create message
router.post(
  "/",
  middlewareController.verifyToken,
  messageController.createMessage
);

// get messages
router.get(
  "/:conversationId",
  middlewareController.verifyToken,
  messageController.getMessages
);

export default router;
