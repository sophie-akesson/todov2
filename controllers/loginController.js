const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const User = require("../models/user");

const loginRender = (req, res) => {
  res.render("login.ejs", { error: "" });
};

const loginSubmit = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) return res.render("login.ejs", { error: "Invalid user" });

  const validUser = await bcrypt.compare(req.body.password, user.password);

  if (!validUser) return res.render("login.ejs", { error: "Wrong password" });

  const loginToken = await jwt.sign({ user: user }, process.env.JWT_KEY);

  if (loginToken) {
    const cookie = req.cookies.loginToken;
    if (!cookie)
      res.cookie("loginToken", loginToken, {
        maxAge: 360000000,
        httpOnly: true,
      });
      return res.redirect(301, "/");
  }

  return res.redirect(301, "/login");
};

module.exports = { loginRender, loginSubmit };
