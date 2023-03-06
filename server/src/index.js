import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";
import db from "./configs/connectDB.js";
import routes from "./routes/index.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(
  express.json({
    limit: "30mb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "30mb",
  })
);

app.use(cookieParser());

routes(app);

db.connect();

const port = process.env.PORT || 8000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("user connected");

  socket.on("disconnect", () => {
    console.log("Disconnected");
  });
});

server.listen(port, () => {
  console.log("Server is running on port", port);
});
