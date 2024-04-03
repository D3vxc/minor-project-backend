const express = require("express");
const router = express.Router();
const { userLoginWithoutToken } = require("./userLoginWithoutToken.js");

router.post("/loginwithouttoken", userLoginWithoutToken);

module.exports = router;
