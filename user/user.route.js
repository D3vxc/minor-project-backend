const express = require("express");
const router = express.Router();
// const { authenticate } = require("../middleware/auth.middleware");
const {
  register,
  login,
  getUsers,
  deleteUser,
  forget_password,
  reset_password,
  getSelf,
  logout,
} = require("./user.controller");
const { authenticate } = require("../middleware/auth.middleware");

router.post("/register", register);
router.post("/login", login);
router.get("/getusers", getUsers);
router.post("/logout", logout);
router.delete("/deleteuser/:id", deleteUser);
router.post("/forget_password", forget_password);
router.post("/reset_password", reset_password);
router.get("/get-self", authenticate, getSelf);

module.exports = router;
