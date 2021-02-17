const express = require("express");
const router = express.Router();

const { registerRender, registerSubmit } = require("../controllers/registerController");

router.get("/register", registerRender);
router.post("/register", registerSubmit);

module.exports = router;