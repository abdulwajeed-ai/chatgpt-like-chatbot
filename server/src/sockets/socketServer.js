const { Server } = require("socket.io");
const { init } = require("../models/authModel");

const initSocketServer = (httpServer) => {
  const io = new Server(httpServer, {});

  io.on("connection", (socket) => {
    console.log("New socket connection:", socket);
  });

};

module.exports = initSocketServer;
