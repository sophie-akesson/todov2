const express = require("express");
const router = express.Router();

const { homeRender, logoutRender } = require("../controllers/homeController");
const { newToDoSubmit, removeSubmit } = require("../controllers/toDoController");
const verifyUser = require("../middleware/verifyUser");

router.get("/", verifyUser, homeRender);
router.post("/new", verifyUser, newToDoSubmit);
router.get("/remove/:id", verifyUser, removeSubmit);
router.get("/logout", logoutRender);

module.exports = router;