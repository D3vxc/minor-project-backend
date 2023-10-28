const express = require("express");
const router = express.Router();
const {
  createWorkout,
  updateWorkout,
  deleteWorkout,
  getAllWorkouts,
} = require("../Workout/workout.controller");

// Create a new workout
router.post("/addworkout", createWorkout);

// Update an existing workout by ID
router.put("/updateworkout", updateWorkout);

// Delete an existing workout by ID
router.delete("/deleteworkout", deleteWorkout);

// Get all workouts
router.get("/getallworkout", getAllWorkouts);

module.exports = router;
