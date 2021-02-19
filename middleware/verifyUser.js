const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyUser = (req, res, next) => {
  const token = req.cookies.loginToken;

  if (!token) return res.render("login.ejs", { error: "" });

  const validUser = jwt.verify(token, process.env.JWT_KEY);

  if (validUser) {
    req.user = validUser;
  }
  next();
};

module.exports = verifyUser;
