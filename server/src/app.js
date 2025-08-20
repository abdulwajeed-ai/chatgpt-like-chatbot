const cookieParser = require("cookie-parser");
const express = require("express");
const connectDB = require("./database/db");
const router = require("./routes/authRoutes");
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", router);


connectDB();

module.exports = app;
