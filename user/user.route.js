const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getUsers,
  deleteUser,
  forget_password,
} = require("./user.controller");

router.post("/register", register);
router.post("/login", login);
router.get("/getusers", getUsers);
router.delete("/deleteuser/:id", deleteUser);
router.post("/forget_password", forget_password);

module.exports = router;
