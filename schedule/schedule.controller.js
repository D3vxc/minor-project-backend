const ScheduleModel = require("../schedule/schedule.model");

// Get all schedules
const getSchedules = async (req, res) => {
  try {
    const schedules = await ScheduleModel.find();
    res.json(schedules);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create a new schedule
const createSchedule = async (req, res) => {
  try {
    const { time, type, workout, trainer, day, trainerImage } = req.body;
    const newSchedule = await ScheduleModel.create({
      time,
      type,
      workout,
      trainer,
      day,
      trainerImage,
    });
    res
      .status(201)
      .json({ data: newSchedule, message: "Schedule created successfully" });
    console.log("object", newSchedule);
  } catch (err) {
    res.status(400).json({ error: "Invalid Request" });
    console.log("error", err);
  }
};

// Get a schedule by ID
const getScheduleById = async (req, res) => {
  try {
    const foundSchedule = await ScheduleModel.findById(req.params.id);
    if (!foundSchedule) {
      return res.status(404).json({ error: "Schedule not found" });
    }
    res.json(foundSchedule);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a schedule
const updateSchedule = async (req, res) => {
  try {
    const schedule = await ProductModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!schedule) {
      return res.status(404).json({ error: "Schedule not found" });
    }
    res.json(schedule);
  } catch (err) {
    res.status(400).json({ error: "Invalid Request" });
  }
};

// Delete a schedule
const deleteSchedule = async (req, res) => {
  try {
    const deletedSchedule = await ScheduleModel.findByIdAndDelete(
      req.params.id
    );
    if (!deletedSchedule) {
      return res.status(404).json({ error: "Schedule not found" });
    }
    res.json({ message: "Schedule deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getSchedules,
  createSchedule,
  getScheduleById,
  updateSchedule,
  deleteSchedule,
};
