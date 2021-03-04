const express = require("express");
const router = express.Router();

const { loginRender, loginSubmit, loginFacebookRedirect, facebookCode, facebookToken } = require("../controllers/loginController");

router.get("/login", loginRender);
router.post("/login", loginSubmit);
router.get("/authenticate/facebook", loginFacebookRedirect);
router.get("/authenticate/facebook/token", facebookCode);
router.post("/authenticate/facebook/token", facebookToken);

module.exports = router;