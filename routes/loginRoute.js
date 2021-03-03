const express = require("express");
const router = express.Router();

const { loginRender, loginSubmit, loginFacebookRedirect, facebookAuth, facebookToken } = require("../controllers/loginController");

router.get("/login", loginRender);
router.post("/login", loginSubmit);
router.get("/authenticate/facebook", loginFacebookRedirect);
router.get("/authenticate/facebook/handshake", facebookAuth);
router.get("/authenticate/facebook/success", facebookToken);

module.exports = router;