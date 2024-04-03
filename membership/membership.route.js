const express = require("express");
const router = express.Router();
const {
  getAllMemberships,
  createMembership,
  deleteMembership,
  updateMembership,
} = require("./membership.controller");

router.get("/getallmembership", getAllMemberships);
router.post("/createmembership", createMembership);
router.delete("/deletemembership", deleteMembership);
router.post("/updatemembership", updateMembership);

module.exports = router;
