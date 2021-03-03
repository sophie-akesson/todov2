const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const sass = require("node-sass-middleware");
const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync(__dirname + '/key.pem'),
  cert: fs.readFileSync(__dirname + '/cert.pem'),
};

const server = https.createServer(options, app);

const homeRoute = require("./routes/homeRoute");
const registerRoute = require("./routes/registerRoute");
const loginRoute = require("./routes/loginRoute");
const resetPasswordRoute = require("./routes/resetPasswordRoute");

require("dotenv").config();

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  sass({
    src: __dirname + "/scss",
    dest: __dirname + "/public/style",
    debug: true,
    outputStyle: "compressed",
    prefix: "/style",
  }),
  express.static(__dirname + "/public")
);

app.use(homeRoute, registerRoute, loginRoute, resetPasswordRoute);

mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (error) => {
    if (error) return;

    https.createServer(options, app).listen(process.env.PORT || 3000, () => {
      console.log("App running on port 3000");
    });

    // app.listen(process.env.PORT || 3000, () => {
    //   console.log("App running on port 3000");
    // });
  }
);
