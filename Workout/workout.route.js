const express = require('express');
const router = express.Router();
const workoutController = require('../Workout/workout.controller');

// Create a new workout
router.post('/', workoutController.createWorkout);

// Update an existing workout by ID
router.put('/:workoutId', workoutController.updateWorkout);

// Delete an existing workout by ID
router.delete('/:workoutId', workoutController.deleteWorkout);

// Get all workouts
router.get('/', workoutController.getAllWorkouts);

module.exports = router;
