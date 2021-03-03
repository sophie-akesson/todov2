const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const User = require("../models/user");

const loginRender = (req, res) => {
  res.render("login.ejs", { error: "", user: "" });
};

const loginSubmit = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) return res.render("login.ejs", { error: "Invalid user", user: "" });

  const validUser = await bcrypt.compare(req.body.password, user.password);

  if (!validUser) return res.render("login.ejs", { error: "Wrong password", user: "" });

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

const loginFacebookRedirect = (req, res) => {
  const redirectUrl = "https://localhost:3000/authenticate/facebook/handshake"
  const appId = process.env.FACEBOOK_ID;
  const state = process.env.FACEBOOK_STATE;

  res.redirect(`https://www.facebook.com/v10.0/dialog/oauth?client_id=${appId}&redirect_uri=${redirectUrl}&state=${state}`);
}

const facebookAuth = (req, res) => {
  const redirectUrl = "https://localhost:3000/"
  const appId = process.env.FACEBOOK_ID;
  const state = process.env.FACEBOOK_STATE;
  const secret = process.env.FACEBOOK_SECRET_KEY;
  const code = req.query.code;

  res.redirect(`https://www.facebook.com/v10.0/dialog/oauth?client_id=${appId}&redirect_uri=${redirectUrl}&client_secret=${secret}&code=${code}`);
}

const facebookToken = (req, res) => {
  const redirectUrl = "https://localhost:3000/"
  const appId = process.env.FACEBOOK_ID;
  const state = process.env.FACEBOOK_STATE;
  const secret = process.env.FACEBOOK_SECRET_KEY;
  const code = req.query.code;

  res.redirect(`https://www.facebook.com/v10.0/dialog/oauth?client_id=${appId}&redirect_uri=${redirectUrl}&client_secret=${secret}&code=${code}`);
}

module.exports = { loginRender, loginSubmit, loginFacebookRedirect, facebookAuth, facebookToken };
