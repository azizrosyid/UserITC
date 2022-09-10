const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const userRouter = require("./app/user/route");
const Handler404NotFound = require("./middleware/Handler404NotFound");
const CustomErrorHandler = require("./middleware/CustomErrorHandler");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/user", userRouter);

app.use(Handler404NotFound);
app.use(CustomErrorHandler);

module.exports = app;
