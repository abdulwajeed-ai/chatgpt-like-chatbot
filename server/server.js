const app = require("./src/app");

const initSocketServer = require("./src/sockets/socketServer")
const httpServer = require("http").createServer(app);


require("dotenv").config;
const PORT = process.env.PORT || 3000;

initSocketServer(httpServer)

httpServer.listen(PORT, () => {
  console.log(
    `Server is running on port ${PORT}`
  );
});
