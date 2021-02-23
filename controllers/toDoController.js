const User = require("../models/user");

const newToDoSubmit = async (req, res) => {
  const { name, date } = req.body;
  const path = req.get('referer');

  try {
    const user = await User.findOne({ email: req.user.user.email });

    user.addToDo({ name: name, dueDate: date, status: "incomplete" });
    return res.redirect(path);
  } catch (error) {
    return res.render("index.ejs", {
      user: "",
      error: "Something went wrong",
      data: "",
    });
  }
};

const removeSubmit = async (req, res) => {
  const toDoId = req.params.id;
  const path = req.get('referer');

  try {
    const user = await User.findOne({ email: req.user.user.email });

    user.removeToDo(toDoId);

    return res.redirect(path);
  } catch (error) {
    return res.render("index.ejs", {
      user: "",
      error: "Something went wrong",
      data: "",
    });
  }
};

const completeSubmit = async (req, res) => {
  const toDoId = req.params.id;
  const path = req.get('referer');

  try {
    const user = await User.findOne({ email: req.user.user.email });

    user.completeToDo(toDoId);

    return res.redirect(path);
  } catch (error) {
    return res.render("index.ejs", {
      user: "",
      error: "Something went wrong",
      data: "",
    });
  }
};

const starSubmit = async (req, res) => {
  const toDoId = req.params.id;
  const path = req.get('referer');

  try {
    const user = await User.findOne({ email: req.user.user.email });

    user.toggleStarredToDo(toDoId);

    return res.redirect(path);
  } catch (error) {
    return res.render("index.ejs", {
      user: "",
      error: error,
      data: "",
    });
  }
};

module.exports = { newToDoSubmit, removeSubmit, completeSubmit, starSubmit };
