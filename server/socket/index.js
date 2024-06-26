const express = require("express");
const { Server } = require("socket.io");
const http = require("http");

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Connect User ", socket.id);

  // disconnect user
  io.on("disconnect", () => {
    console.log("Disconnect User", socket.id);
  });
});

module.exports = {
  app,
  server,
};
