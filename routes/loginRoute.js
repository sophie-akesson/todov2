const express = require("express");
const router = express.Router();

const { loginRender, loginSubmit, loginFacebookRedirect, facebookLogin } = require("../controllers/loginController");

router.get("/login", loginRender);
router.post("/login", loginSubmit);
router.get("/auth/facebook", loginFacebookRedirect);
router.get("/auth/facebook/login", facebookLogin);

module.exports = router;