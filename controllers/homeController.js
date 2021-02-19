const User = require("../models/user");

const homeRender = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.user.user.email });
        res.render("index.ejs", { user: req.user.user.name, error: "", data: user.ToDoList });
    }
    catch {
        res.render("index.ejs", { user: "", error: "Something went wrong with fetching your user", data: "" });
    }
}

const newToDoSubmit = async (req, res) => {
    const { name, date } = req.body;

    try {
        const user = await User.findOne({ email: req.user.user.email });

        user.addToDo({ name: name, dueDate: date, status: "incomplete" });
        return res.redirect(301, "/");
    }
    catch(error) {
        return res.render("index.ejs", { user: "", error: "Something went wrong with fetching your user", data: "" });
    }
}

const logoutRender = (req, res) => {
    res.clearCookie("loginToken").redirect("/");
}

module.exports = { homeRender, newToDoSubmit, logoutRender };