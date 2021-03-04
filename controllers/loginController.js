const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const fetch = require("node-fetch");
require("dotenv").config();

const User = require("../models/user");

const loginRender = (req, res) => {
  res.render("login.ejs", { error: "", user: "" });
};

const loginSubmit = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user)
    return res.render("login.ejs", { error: "Invalid user", user: "" });

  const validUser = await bcrypt.compare(req.body.password, user.password);

  if (!validUser)
    return res.render("login.ejs", { error: "Wrong password", user: "" });

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
  const redirectUrl = "https://localhost:3000/auth/facebook/login";
  const appId = process.env.FACEBOOK_ID;
  const state = process.env.FACEBOOK_STATE;

  res.redirect(
    `https://www.facebook.com/v10.0/dialog/oauth?client_id=${appId}&redirect_uri=${redirectUrl}&state=${state}&scope=email`
  );
};

const facebookLogin = async (req, res) => {
  const redirectUrl = "https://localhost:3000/auth/facebook/login";
  const appId = process.env.FACEBOOK_ID;
  const secret = process.env.FACEBOOK_SECRET_KEY;
  const code = req.query.code;

  try {
    const tokenResponse = await fetch(
      `https://graph.facebook.com/v10.0/oauth/access_token?client_id=${appId}&redirect_uri=${redirectUrl}&client_secret=${secret}&code=${code}`
    );
    const token = await tokenResponse.json();

    const isValidResponse = await fetch(
      `https://graph.facebook.com/debug_token?input_token=${token.access_token}&access_token=${appId}|${secret}`
    );
    const isValid = await isValidResponse.json();

    if (isValid.data.is_valid === true) {
      const userResponse = await fetch(
        `https://graph.facebook.com/${isValid.data.user_id}?fields=email&access_token=${token.access_token}`
      );
      const user = await userResponse.json();

      const dbUser = await User.findOne({ email: user.email });

      if (!dbUser)
        return res.render("login.ejs", { error: "Invalid user", user: "" });

      const loginToken = await jwt.sign({ user: dbUser }, process.env.JWT_KEY);

      if (loginToken) {
        const cookie = req.cookies.loginToken;
        if (!cookie)
          res.cookie("loginToken", loginToken, {
            maxAge: 360000000,
            httpOnly: true,
          });
        return res.redirect(301, "/");
      }
    }
  } catch (error) {
    return res.render("login.ejs", { error: error, user: "" });
  }
};

module.exports = {
  loginRender,
  loginSubmit,
  loginFacebookRedirect,
  facebookLogin,
};
