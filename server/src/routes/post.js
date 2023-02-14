import express from "express";
import postController from "../controllers/postController.js";
import middlewareController from "../middlewares/middlewareController.js";

const router = express.Router();

//get all posts
router.get("/", middlewareController.verifyToken, postController.getAllPosts);

//create new post
router.post(
  "/",
  middlewareController.verifyToken,
  postController.createNewPost
);

//update post
router.put("/:id", middlewareController.verifyToken, postController.updatePost);

//get posts user
router.get(
  "/:userId",
  middlewareController.verifyToken,
  postController.getPostsUser
);

//saved post

//like post
router.patch(
  "/:postId/like",
  middlewareController.verifyToken,
  postController.likePost
);

//unlike post
router.patch(
  "/:postId/unlike",
  middlewareController.verifyToken,
  postController.unLikePost
);

export default router;
