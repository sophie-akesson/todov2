const User = require("../models/user");
const luxon = require("luxon");

const homeRender = async (req, res) => {
  const count = +req.query.count || 5;
  const sort = req.query.sort || "asc";

  try {
    const user = await User.findOne({ _id: req.user.user._id }).populate({
      path: "toDoList",
      match: { status: { $eq: "incomplete" } },
      options: {
        limit: count,
        sort: { dueDate: sort },
      },
    });

    const totalData = await User.findOne({ _id: req.user.user._id }).populate({
      path: "toDoList",
      match: { status: { $eq: "incomplete" } },
    });
    const toDoLength = totalData.toDoList.length;

    res.render("index.ejs", {
      user: req.user.user.name,
      error: "",
      data: user.toDoList,
      nrOfToDos: toDoLength,
      count: count,
      path: "/",
      sort: sort,
    });
  } catch (error) {
    res.render("index.ejs", {
      user: "",
      error: error,
      data: "",
      count: count,
      path: "/",
      sort: sort,
    });
  }
};

const starredRender = async (req, res) => {
  const count = +req.query.count || 5;
  const sort = req.query.sort || "asc";

  try {
    const user = await User.findOne({ _id: req.user.user._id }).populate({
      path: "toDoList",
      match: { status: { $eq: "incomplete" }, starred: { $eq: true } },
      options: {
        limit: count,
        sort: { dueDate: sort },
      },
    });

    const totalData = await User.findOne({ _id: req.user.user._id }).populate({
      path: "toDoList",
      match: { status: { $eq: "incomplete" }, starred: { $eq: true } },
    });
    const toDoLength = totalData.toDoList.length;

    res.render("index.ejs", {
      user: req.user.user.name,
      error: "",
      data: user.toDoList,
      nrOfToDos: toDoLength,
      count: count,
      path: "/starred",
      sort: sort,
    });
  } catch (error) {
    res.render("index.ejs", {
      user: "",
      error: error,
      data: "",
      count: count,
      path: "/starred",
      sort: sort,
    });
  }
};

const dueThisWeekRender = async (req, res) => {
  const count = +req.query.count || 5;
  const sort = req.query.sort || "asc";

  try {
    const user = await User.findOne({ _id: req.user.user._id }).populate({
      path: "toDoList",
      match: {
        status: { $eq: "incomplete" },
        dueDate: {
          $gte: luxon.DateTime.now().startOf("week").toISO(),
          $lte: (endDate = luxon.DateTime.now().endOf("week").toISO()),
        },
      },
      options: {
        limit: count,
        sort: { dueDate: sort },
      },
    });

    const totalData = await User.findOne({ _id: req.user.user._id }).populate({
      path: "toDoList",
      match: {
        status: { $eq: "incomplete" },
        dueDate: {
          $gte: luxon.DateTime.now().startOf("week").toISO(),
          $lte: (endDate = luxon.DateTime.now().endOf("week").toISO()),
        },
      },
    });
    const toDoLength = totalData.toDoList.length;

    res.render("index.ejs", {
      user: req.user.user.name,
      error: "",
      data: user.toDoList,
      nrOfToDos: toDoLength,
      count: count,
      path: "/due",
      sort: sort,
    });
  } catch (error) {
    res.render("index.ejs", {
      user: "",
      error: error,
      data: "",
      count: count,
      path: "/due",
      sort: sort,
    });
  }
};

const completedToDosRender = async (req, res) => {
  const count = +req.query.count || 5;
  const sort = req.query.sort || "asc";

  try {
    const user = await User.findOne({ _id: req.user.user._id }).populate({
      path: "toDoList",
      match: { status: { $eq: "completed" } },
      options: {
        limit: count,
        sort: { dueDate: sort },
      },
    });

    const totalData = await User.findOne({ _id: req.user.user._id }).populate({
      path: "toDoList",
      match: { status: { $eq: "completed" } },
    });
    const toDoLength = totalData.toDoList.length;

    res.render("index.ejs", {
      user: req.user.user.name,
      error: "",
      data: user.toDoList,
      nrOfToDos: toDoLength,
      count: count,
      path: "/completed",
      sort: sort,
    });
  } catch (error) {
    res.render("index.ejs", {
      user: "",
      error: error,
      data: "",
      path: "/completed",
      sort: sort,
    });
  }
};

const logoutRender = (req, res) => {
  res.clearCookie("loginToken").redirect("/");
};

module.exports = {
  homeRender,
  starredRender,
  dueThisWeekRender,
  completedToDosRender,
  logoutRender,
};
