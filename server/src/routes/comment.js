import express from "express";
import commentController from "../controllers/commentController.js";
import middlewareController from "../middlewares/middlewareController.js";

const router = express.Router();

router.post(
  "/create",
  middlewareController.verifyToken,
  commentController.createComment
);

router.put(
  "/:commentId/update",
  middlewareController.verifyToken,
  commentController.updateComment
);

router.delete(
  "/:commentId/delete",
  middlewareController.verifyToken,
  commentController.deleteComment
);

export default router;
