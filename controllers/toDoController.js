const User = require("../models/user");
const ToDo = require("../models/todo");

const newToDoSubmit = async (req, res) => {
  const { name, date } = req.body;
  const path = req.get("referer");

  try {
    const todo = await new ToDo({
      name: name,
      dueDate: date,
      status: "incomplete",
    }).save();
    const user = await User.findOne({ email: req.user.user.email });

    user.addToDo(todo._id);
    return res.redirect(path);
  } catch (error) {
    return res.render("index.ejs", {
      user: "",
      error: error,
      data: "",
      nrOfToDos: 0,
      count: 0,
      path: path,
      sort: "asc",
    });
  }
};

const removeSubmit = async (req, res) => {
  const toDoId = req.params.id;
  const path = req.get("referer");

  try {
    await ToDo.deleteOne({ _id: toDoId });

    return res.redirect(path);
  } catch (error) {
    return res.render("index.ejs", {
      user: "",
      error: error,
      data: "",
      nrOfToDos: 0,
      count: 0,
      path: path,
      sort: "asc",
    });
  }
};

const completeSubmit = async (req, res) => {
  const toDoId = req.params.id;
  const path = req.get("referer");

  try {
    const todo = await ToDo.findOne({ _id: toDoId });

    todo.status = "completed";
    todo.save();

    return res.redirect(path);
  } catch (error) {
    return res.render("index.ejs", {
      user: "",
      error: error,
      data: "",
      nrOfToDos: 0,
      count: 0,
      path: path,
      sort: "asc",
    });
  }
};

const starSubmit = async (req, res) => {
  const toDoId = req.params.id;
  const path = req.get("referer");

  try {
    const todo = await ToDo.findOne({ _id: toDoId });

    if (todo.starred === false) todo.starred = true;
    else if (todo.starred === true) todo.starred = false;

    await todo.save();

    return res.redirect(path);
  } catch (error) {
    return res.render("index.ejs", {
      user: "",
      error: error,
      data: "",
      nrOfToDos: 0,
      count: 0,
      path: path,
      sort: "asc",
    });
  }
};

module.exports = { newToDoSubmit, removeSubmit, completeSubmit, starSubmit };
