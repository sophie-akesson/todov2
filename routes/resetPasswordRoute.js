const express = require("express");
const router = express.Router();

const { resetRender, resetSubmit, setPasswordRender, setPasswordSubmit } = require("../controllers/resetPasswordController");

router.get("/reset", resetRender);
router.post("/reset", resetSubmit);
router.get("/reset/:token", setPasswordRender);
router.post("/reset/password", setPasswordSubmit);

module.exports = router;