const crypto = require("crypto");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

const User = require("../models/user");

const transport = nodemailer.createTransport({
  host: process.env.MAILSERVICE_HOST,
  port: process.env.MAILSERVICE_PORT,
  secure: true,
  auth: {
    user: process.env.MAILSERVICE_USER,
    pass: process.env.MAILSERVICE_PW,
  },
});

const resetRender = (req, res) => {
  res.render("resetPassword.ejs", { error: "", user: "" });
};

const resetSubmit = async (req, res) => {
  try {
    const email = req.body.email;

  const user = await User.findOne({ email: email });

  if (!user)
    return res.render("resetPassword.ejs", { error: "User does not exist", user: "" });

  const token = crypto.randomBytes(32).toString("hex");

  user.token = token;
  user.tokenExpirationDate = Date.now() + 600000;

  await user.save();

  transport.sendMail({
    from: process.env.MAILSERVICE_USER,
    to: user.email,
    subject: "Password reset",
    html: `<h1>Password reset</h1><a href="http://localhost:8000/reset/${user.token}">Click here to set a new password.</a>`,
  });

  res.render("checkMail.ejs", { email: email, user: "" });
  } catch(error) {
    res.render("resetPassword.ejs", { error: error, user: "" });
  }
};

const setPasswordRender = async (req, res) => {
  const token = req.params.token;

  try {
    const user = await User.findOne({
      token: token,
      tokenExpirationDate: { $gt: Date.now() },
    });

    if (!user)
      return res.render("resetPassword.ejs", {
        error: "Token incorrect or expired, please try again.",
        user: ""
      });

    return res.render("passwordForm.ejs", { error: "", email: user.email, user: "" });
  } catch (error) {
    res.render("resetPassword.ejs", { error: "Try again", user: "" });
  }
};

const setPasswordSubmit = async (req, res) => {
  const { password, confirmedPassword, email } = req.body;

  if (password !== confirmedPassword)
    return res.render("passwordForm.ejs", { error: "Password does not match", email: email, user: "" });

  try {
    const user = await User.findOne({ email: email });
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;
    await user.save();

    return res.redirect(301, "/login");
  } catch (error) {}
  res.render("passwordForm.ejs", { error: error, user: "" });
};

module.exports = {
  resetRender,
  resetSubmit,
  setPasswordRender,
  setPasswordSubmit,
};
