const express = require("express");
const router = express.Router();

const { homeRender, newToDoSubmit } = require("../controllers/homeController");
const verifyUser = require("../middleware/verifyUser");

router.get("/", verifyUser, homeRender);
router.post("/new", verifyUser, newToDoSubmit);

module.exports = router;