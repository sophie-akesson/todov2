const User = require("../models/user");
const luxon = require("luxon");

const homeRender = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.user.email });

    let userList = [];

    user.toDoList.forEach((toDo) => {
      if (toDo.status === "incomplete") userList.push(toDo);
    });

    res.render("index.ejs", {
      user: req.user.user.name,
      error: "",
      data: userList,
    });
  } catch (error) {
    res.render("index.ejs", { user: "", error: error, data: "" });
  }
};

const starredRender = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.user.email });
    let userList = [];

    user.toDoList.forEach((toDo) => {
      if (toDo.starred === true && toDo.status === "incomplete") userList.push(toDo);
    });

    res.render("index.ejs", {
      user: req.user.user.name,
      error: "",
      data: userList,
    });
  } catch (error) {
    res.render("index.ejs", { user: "", error: error, data: "" });
  }
};

const dueThisWeekRender = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.user.email });
    let userList = [];
    const day = luxon.DateTime.now().day;
    const month = luxon.DateTime.now().month;
    const year = luxon.DateTime.now().year;
    const currentWeek = luxon.DateTime.local(year, month, day).weekNumber;

    user.toDoList.forEach((toDo) => {
      const dueDay = luxon.DateTime.fromJSDate(toDo.dueDate).day;
      const dueMonth = luxon.DateTime.fromJSDate(toDo.dueDate).month;
      const dueYear = luxon.DateTime.fromJSDate(toDo.dueDate).year;
      const dueWeek = luxon.DateTime.local(dueYear, dueMonth, dueDay).weekNumber;

      if (dueWeek === currentWeek && toDo.status === "incomplete") userList.push(toDo);
    });

    res.render("index.ejs", {
      user: req.user.user.name,
      error: "",
      data: userList,
    });
  } catch (error) {
    res.render("index.ejs", { user: "", error: error, data: "" });
  }
};

const completedToDosRender = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.user.email });
    let userList = [];

    user.toDoList.forEach((toDo) => {
    if (toDo.status == "complete") userList.push(toDo);
    });

    res.render("index.ejs", {
      user: req.user.user.name,
      error: "",
      data: userList,
    });
  } catch (error) {
    res.render("index.ejs", { user: "", error: error, data: "" });
  }
};

const logoutRender = (req, res) => {
  res.clearCookie("loginToken").redirect("/");
};

module.exports = { homeRender, starredRender, dueThisWeekRender, completedToDosRender, logoutRender };
