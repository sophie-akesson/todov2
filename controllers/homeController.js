const homeRender = (req, res) => {
    res.render("index.ejs", { user: req.user.user.name });
}

module.exports = { homeRender };