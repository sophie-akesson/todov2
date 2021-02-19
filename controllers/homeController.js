const User = require("../models/user");

const homeRender = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.user.user.email });
        res.render("index.ejs", { user: req.user.user.name, error: "", data: user.toDoList });
    }
    catch(error) {
        res.render("index.ejs", { user: "", error: "Something went wrong", data: "" });
    }
}

const logoutRender = (req, res) => {
    res.clearCookie("loginToken").redirect("/");
}

module.exports = { homeRender, logoutRender };