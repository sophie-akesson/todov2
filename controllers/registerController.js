const bcrypt = require("bcrypt");

const User = require("../models/user");

const registerRender = (req, res) => {
  res.render("register.ejs", { error: "", user: "" });
};

const registerSubmit = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    await new User({
      name: name,
      email: email,
      password: hashedPassword,
    }).save();

    res.redirect(301, "/login");
  } catch (error) {
      return res.render("register.ejs", { error: error, user: "" })
  }
};

module.exports = { registerRender, registerSubmit };
