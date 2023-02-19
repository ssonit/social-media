import authRoute from "./auth.js";
import userRoute from "./user.js";
import postRoute from "./post.js";
import uploadRoute from "./upload.js";
import commentRoute from "./comment.js";

const routes = (app) => {
  app.use("/v1/auth", authRoute);
  app.use("/v1/user", userRoute);
  app.use("/v1/post", postRoute);
  app.use("/v1/upload", uploadRoute);
  app.use("/v1/comment", commentRoute);
};

export default routes;
