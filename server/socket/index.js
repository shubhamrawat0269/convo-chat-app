const express = require("express");
const { Server } = require("socket.io");
const http = require("http");

const { userService } = require("../services");

const messagesModel = require("../models/message.model");
const conversationModel = require("../models/conversation.model");
const { getUserDetailsFromToken } = require("../utils/getUserDetailsFromToken");

const app = express();

const server = http.createServer(app);
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
  onlineUsers.add(user?.id);

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

    // get previous message
    const getConversationMessage = await conversationModel
      .findOne({
        $or: [
          { sender: user?.id, reciever: userId },
          { sender: userId, reciever: user?.id },
        ],
      })
      .populate("messages")
      .sort({ updatedAt: -1 });

    socket.emit("message", getConversationMessage.messages);
  });

  socket.on("new message", async (data) => {
    // check converstiona availabel for both user
    // console.log(data);
    let conversation = await conversationModel.findOne({
      $or: [
        { sender: data?.sender, reciever: data?.reciever },
        { sender: data?.reciever, reciever: data?.sender },
      ],
    });

    if (!conversation) {
      const createConnection = await conversationModel({
        sender: data?.sender,
        reciever: data?.reciever,
      });
      conversation = await createConnection.save();
    }

    // console.log(conversation);

    const message = new messagesModel({
      text: data?.text,
      imageUrl: data?.imageUrl,
      videoUrl: data?.videoUrl,
      msgByUserId: data?.msgByUserId,
    });

    const saveMessage = await message.save();
    console.log(saveMessage);

    await conversationModel.updateOne(
      { _id: conversation?._id },
      { $push: { messages: saveMessage?._id } }
    );
    // send all convo to front end client

    io.to(data?.sender).emit("message", getConversationMessage.messages);
    io.to(data?.reciever).emit("message", getConversationMessage.messages);
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
