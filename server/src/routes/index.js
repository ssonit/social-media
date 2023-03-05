import authRoute from "./auth.js";
import userRoute from "./user.js";
import postRoute from "./post.js";
import uploadRoute from "./upload.js";
import commentRoute from "./comment.js";
import conversationRoute from "./conversation.js";
import messageRoute from "./message.js";

const routes = (app) => {
  app.use("/v1/auth", authRoute);
  app.use("/v1/user", userRoute);
  app.use("/v1/post", postRoute);
  app.use("/v1/upload", uploadRoute);
  app.use("/v1/comment", commentRoute);
  app.use("/v1/conversation", conversationRoute);
  app.use("/v1/message", messageRoute);
};

export default routes;
