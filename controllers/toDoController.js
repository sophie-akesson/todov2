const User = require("../models/user");

const newToDoSubmit = async (req, res) => {
  const { name, date } = req.body;

  try {
    const user = await User.findOne({ email: req.user.user.email });

    user.addToDo({ name: name, dueDate: date, status: "incomplete" });
    return res.redirect(301, "/");
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

  try {
    const user = await User.findOne({ email: req.user.user.email });

    user.removeToDo(toDoId);

    return res.redirect(301, "/");
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

  try {
    const user = await User.findOne({ email: req.user.user.email });

    user.completeTodo(toDoId);

    return res.redirect(301, "/");
  } catch (error) {
    return res.render("index.ejs", {
      user: "",
      error: "Something went wrong",
      data: "",
    });
  }
}

module.exports = { newToDoSubmit, removeSubmit, completeSubmit };
