const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
 
  exercises: [
    {
      name: String,
      sets: Number,
      reps: Number,
      rest: Number,
      // Add more exercise-related fields as needed
    },
  ],
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;