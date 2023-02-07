import express from "express";
import uploadController from "../controllers/uploadController.js";
import middlewareController from "../middlewares/middlewareController.js";
import uploadCloud from "../configs/cloudinary.js";

const router = express.Router();

//upload single image
router.post(
  "/image",
  uploadCloud("instagram-clone").single("image"),
  uploadController.uploadImage
);

//upload multiple images
router.post(
  "/images",
  uploadCloud("instagram-clone").array("images", 5),
  uploadController.uploadImages
);

export default router;
