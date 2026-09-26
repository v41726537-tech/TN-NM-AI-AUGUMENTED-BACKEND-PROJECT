const Workout = require('../models/Workout');

// @desc    Get all workouts for logged in user
// @route   GET /api/workouts
const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ userId: req.user._id }).sort({ date: -1 });
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new workout
// @route   POST /api/workouts
const createWorkout = async (req, res) => {
  try {
    const { exerciseName, category, sets, reps, weight, durationMinutes, caloriesBurned, date } = req.body;

    if (!exerciseName || !sets || !reps) {
      return res.status(400).json({ message: 'exerciseName, sets, and reps are required' });
    }

    const workout = await Workout.create({
      userId: req.user._id,
      exerciseName,
      category,
      sets,
      reps,
      weight,
      durationMinutes,
      caloriesBurned,
      date,
    });

    res.status(201).json(workout);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a workout
// @route   PUT /api/workouts/:id
const updateWorkout = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);

    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }

    if (workout.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized to update this workout' });
    }

    const updatedWorkout = await Workout.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedWorkout);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a workout
// @route   DELETE /api/workouts/:id
const deleteWorkout = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);

    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }

    if (workout.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized to delete this workout' });
    }

    await workout.deleteOne();
    res.json({ message: 'Workout removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getWorkouts,
  createWorkout,
  updateWorkout,
  deleteWorkout,
};