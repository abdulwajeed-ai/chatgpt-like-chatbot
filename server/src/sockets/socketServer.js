const { Server } = require("socket.io");

const cookie = require("cookie");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userModel = require("../models/authModel");

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
      next(new Error("Authentication error: Invalid Token"));
    }
  });
  io.on("connection", (socket) => {
    console.log("User connected", socket.user);
    console.log("New socket connection:", socket.id);
    socket.on("disconnect",(socket)=>{
      console.log("user disconnected")
    })
  });
};

module.exports = initSocketServer;
