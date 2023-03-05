import express from "express";
import middlewareController from "../middlewares/middlewareController.js";
import conversationController from "../controllers/conversationController.js";

const router = express.Router();

// create conversation
router.post(
  "/",
  middlewareController.verifyToken,
  conversationController.createConversation
);

// get conversation
router.get(
  "/:userId",
  middlewareController.verifyToken,
  conversationController.getConversations
);

export default router;
