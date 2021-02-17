const express = require("express");
const router = express.Router();

const { homeRender } = require("../controllers/homeController");
const verifyUser = require("../middleware/verifyUser");

router.get("/", verifyUser, homeRender);

module.exports = router;