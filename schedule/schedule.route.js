const express = require("express");
const router = express.Router();

const {
    getSchedules,
    createSchedule,
    getScheduleById,
    updateSchedule,
    deleteSchedule,
    } = require("./schedule.controller");

router.get("/allschedules", getSchedules);
router.post("/newschedule", createSchedule);
router.get("/getschedule/:id", getScheduleById);
router.put("/updateschedule/:id", updateSchedule);
router.delete("/deleteschedule/:id", deleteSchedule);

module.exports = router;