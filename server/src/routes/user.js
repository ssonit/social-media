import express from "express";
import userController from "../controllers/userController.js";
import middlewareController from "../middlewares/middlewareController.js";

const router = express.Router();

// Search user
router.get(
  "/search",
  middlewareController.verifyToken,
  userController.getSearchUser
);

// Get suggestion user
router.get(
  "/:id/suggestion",
  middlewareController.verifyToken,
  userController.getSuggestionsUser
);

// Get users without conversation with me
router.get(
  "/:id/usersWithoutConversation",
  middlewareController.verifyToken,
  userController.getUsersWithoutConversation
);

// Get user
router.get("/:id", middlewareController.verifyToken, userController.getUser);

//Update current user
router.put("/", middlewareController.verifyToken, userController.updateUser);

// Follow user
router.put(
  "/:id/follow",
  middlewareController.verifyToken,
  userController.followUser
);

// Unfollow user
router.put(
  "/:id/unfollow",
  middlewareController.verifyToken,
  userController.unfollowUser
);

export default router;
