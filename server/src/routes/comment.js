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

router.delete(
  "/delete",
  middlewareController.verifyToken,
  commentController.deleteManyComments
);

router.patch(
  "/:commentId/like",
  middlewareController.verifyToken,
  commentController.likeComment
);

router.patch(
  "/:commentId/unlike",
  middlewareController.verifyToken,
  commentController.unlikeComment
);

export default router;
