import authRoute from "./auth.js";
import userRoute from "./user.js";
import postRoute from "./post.js";
import uploadRoute from "./upload.js";

const routes = (app) => {
  app.use("/v1/auth", authRoute);
  app.use("/v1/user", userRoute);
  app.use("/v1/post", postRoute);
  app.use("/v1/upload", uploadRoute);
};

export default routes;
