const cookieParser = require("cookie-parser");
const express = require("express");
const connectDB = require("./database/db");

const app = express();
// routes
const authRoutes = require("./routes/authRoutes");
const chatRoutes = require("./routes/chatRoutes");

// builtin and third party middlewares
app.use(express.json());
app.use(cookieParser());

// routes usage
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);

// dbconnection function call
connectDB();

module.exports = app;
