const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/auth.middleware");
const {
  register,
  login,
  getUsers,
  deleteUser,
  forget_password,
  reset_password,
} = require("./user.controller");

router.post("/register", register);
router.post("/login", authenticate, login);
router.get("/getusers", getUsers);
router.delete("/deleteuser/:id", deleteUser);
router.post("/forget_password", forget_password);
router.post("/reset_password", reset_password);

module.exports = router;
