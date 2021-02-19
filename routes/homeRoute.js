const express = require("express");
const router = express.Router();

const { homeRender, newToDoSubmit, logoutRender } = require("../controllers/homeController");
const verifyUser = require("../middleware/verifyUser");

router.get("/", verifyUser, homeRender);
router.post("/new", verifyUser, newToDoSubmit);
router.get("/logout", logoutRender);

module.exports = router;