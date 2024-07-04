const express = require("express");
const { Server } = require("socket.io");
const http = require("http");

const { userService } = require("../services");

const { getUserDetailsFromToken } = require("../utils/getUserDetailsFromToken");

const app = express();

const server = http.createServer(app);
console.log(process.env.FRONTEND_URL);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  },
});

const onlineUsers = new Set();

io.on("connection", async (socket) => {
  console.log("Connect User ", socket.id);

  // console.log(socket.handshake.auth.token);
  const token = JSON.parse(socket.handshake.auth.token);
  // console.log(token);
  const user = await getUserDetailsFromToken(token);

  // create a room
  socket.join(user?.id);
  onlineUsers.add(user?.id?.toString());

  io.emit("onlineuser", Array.from(onlineUsers));

  socket.on("message-page", async (userId) => {
    // console.log(userId);
    const userDetails = await userService.getUserById(userId);
    // console.log(userDetails);

    const payload = {
      id: userDetails?._id,
      name: userDetails?.name,
      email: userDetails?.email,
      profile: userDetails?.profile,
      online: onlineUsers.has(userId),
    };
    socket.emit("message-user", payload);
  });

  socket.on("disconnect", () => {
    onlineUsers.delete(user?.id);
    console.log("Disconnect User  ", socket.id);
  });
});

module.exports = {
  app,
  server,
};
