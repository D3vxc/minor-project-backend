const Workout = require('../Workout/workout.model');

// Controller to create a new workout
const createWorkout = async (req, res) => {
  const { title, exercises } = req.body;

  try {
    const newWorkout = new Workout({
      title,
      exercises,
    });

    const savedWorkout = await newWorkout.save();
    res.status(201).json({ message: 'Workout created successfully', workout: savedWorkout });
  } catch (error) {
    res.status(400).json({ error: 'Workout creation failed' });
  }
};

// Controller to update an existing workout
const updateWorkout = async (req, res) => {
  const { workoutId } = req.params;
  const { title,  exercises } = req.body;

  try {
    const updatedWorkout = await Workout.findByIdAndUpdate(
      workoutId,
      { title, exercises },
      { new: true }
    );

    if (!updatedWorkout) {
      return res.status(404).json({ error: 'Workout not found' });
    }

    res.status(200).json({ message: 'Workout updated successfully', workout: updatedWorkout });
  } catch (error) {
    res.status(400).json({ error: 'Workout update failed' });
  }
};

// Controller to delete an existing workout
const deleteWorkout = async (req, res) => {
  const { workoutId } = req.params;

  try {
    const deletedWorkout = await Workout.findByIdAndDelete(workoutId);

    if (!deletedWorkout) {
      return res.status(404).json({ error: 'Workout not found' });
    }

    res.status(200).json({ message: 'Workout deleted successfully', workout: deletedWorkout });
  } catch (error) {
    res.status(400).json({ error: 'Workout deletion failed' });
  }
};

// Controller to get all workouts
const getAllWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find();
    res.status(200).json({ workouts });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching workouts' });
  }
};

module.exports = {
  createWorkout,
  updateWorkout,
  deleteWorkout,
  getAllWorkouts,
};
