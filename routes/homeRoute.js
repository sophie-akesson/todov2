const express = require("express");
const router = express.Router();

const { homeRender, starredRender, dueThisWeekRender, completedToDosRender, logoutRender } = require("../controllers/homeController");
const { newToDoSubmit, removeSubmit, completeSubmit, starSubmit } = require("../controllers/toDoController");
const verifyUser = require("../middleware/verifyUser");

router.get("/", verifyUser, homeRender);
router.get("/starred", verifyUser, starredRender);
router.get("/star/:id", verifyUser, starSubmit);
router.get("/due", verifyUser, dueThisWeekRender);
router.get("/completed", verifyUser, completedToDosRender);
router.post("/new", verifyUser, newToDoSubmit);
router.get("/remove/:id", verifyUser, removeSubmit);
router.get("/complete/:id", verifyUser, completeSubmit);
router.get("/logout", logoutRender);

module.exports = router;