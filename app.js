const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const homeRoute = require("./routes/homeRoute");
const registerRoute = require("./routes/registerRoute");
const loginRoute = require("./routes/loginRoute");

require("dotenv").config();

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(homeRoute, registerRoute, loginRoute);

mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (error) => {
    if (error) return;

    app.listen(process.env.PORT || 8000, () => {
      console.log("App running on port 8000");
    });
  }
);
