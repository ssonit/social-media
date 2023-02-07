import express from "express";
import authController from "../controllers/authController.js";
import middlewareController from "../middlewares/middlewareController.js";

const router = express.Router();

//Login
router.post("/login", authController.loginUser);

//Register
router.post("/register", authController.registerUser);

//Refresh token
router.post("/refreshToken", authController.refreshToken);

// Reload get user
router.post("/reload", authController.reloadGetUser);

//Logout
router.post(
  "/logout",
  middlewareController.verifyToken,
  authController.logoutUser
);

export default router;
