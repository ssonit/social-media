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
    methods: ["GET", "POST"],
  },
});

const users = [];

const addUser = (socketId, userId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ socketId, userId });
};

const removeUser = (socketId) => {
  const index = users.findIndex((user) => user.socketId === socketId);

  if (index !== -1) users.splice(index, 1);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

// {
//   socketId,
//   senderId,
//   roomId
// }

io.on("connection", (socket) => {
  console.log("user connected");

  const { roomId } = socket.handshake.query;
  socket.join(roomId);

  socket.on("onlineUser", (data) => {
    addUser(socket.id, data.userId);
    io.emit("getUsers", users);
  });

  socket.on("sendMessage", ({ message, senderId }) => {
    io.in(roomId).emit("getMessage", { message, roomId, senderId });
  });

  socket.on("disconnect", () => {
    console.log("Disconnected");
    removeUser(socket.id);
    io.emit("getUsers", users);
    socket.leave(roomId);
  });
});

server.listen(port, () => {
  console.log("Server is running on port", port);
});
