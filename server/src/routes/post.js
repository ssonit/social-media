import express from "express";
import postController from "../controllers/postController.js";
import middlewareController from "../middlewares/middlewareController.js";

const router = express.Router();

//get all posts
router.get("/", middlewareController.verifyToken, postController.getAllPosts);

//get post by id
router.get(
  "/:postId",
  middlewareController.verifyToken,
  postController.getPost
);

//create new post
router.post(
  "/",
  middlewareController.verifyToken,
  postController.createNewPost
);

//update post
router.put("/:id", middlewareController.verifyToken, postController.updatePost);

// delete post
router.delete(
  "/:postId",
  middlewareController.verifyToken,
  postController.deletePost
);

// get posts discover
router.get(
  "/discover",
  middlewareController.verifyToken,
  postController.getPostsDiscover
);

//get posts user
router.get(
  "/:userId/user",
  middlewareController.verifyToken,
  postController.getPostsUser
);

//saved post
router.patch(
  "/:postId/saved",
  middlewareController.verifyToken,
  postController.savedPost
);

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
