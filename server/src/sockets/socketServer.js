const { Server } = require("socket.io");

const cookie = require("cookie");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userModel = require("../models/authModel");
const aiService = require("../services/aiService");
const messageModel = require("../models/messageModel")

const initSocketServer = (httpServer) => {
  const io = new Server(httpServer, {});

  io.use(async (socket, next) => {
    const cookies = cookie.parse(socket.handshake.headers?.cookie || "");
    if (!cookies.token) {
      next(new Error("Authentication error: no token provided"));
    }

    try {
      const decoded = jwt.verify(cookies.token, process.env.JWT_SECRET);
      const user = await userModel.findById(decoded.id);
      socket.user = user;
      next();
    } catch (err) {
      next(new Error("Authentication error: Invalid token"));
    }
  });
  io.on("connection", (socket) => {
    console.log("User connected", socket.user);
    console.log("New socket connection:", socket.id);

    socket.on("ai-message", async (messagePayload) => {
      console.log("Incoming message:", messagePayload);

      const response = await aiService.generateResponse(messagePayload.content);

      socket.emit("ai-response", {
        content: response,
        chat: messagePayload.chat,
      });
    });
  });
};

module.exports = initSocketServer;
