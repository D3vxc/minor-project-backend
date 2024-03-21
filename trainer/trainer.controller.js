const TrainerModel = require('../trainer/trainer.model');

// Get all trainers
const getTrainers = async (req, res) => {
  try {
    const trainers = await TrainerModel.find();
    res.json(trainers);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create a new trainer
const createTrainer = async (req, res) => {
  try {
    const { name, image, specialty, experience, rating, socialHandling } = req.body;
    const newTrainer = await TrainerModel.create
    ({ 
        name,
        image, 
        specialty, 
        experience,
        rating,
        socialHandling
    });
    res
    .status(201).json({ data: newTrainer, message: 'Trainer created successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Invalid Request' });
  }
};

// Get a trainer by ID
const getTrainerById = async (req, res) => {
  try {
    const foundTrainer = await TrainerModel.findById(req.params.id);
    if (!foundTrainer) {
      return res.status(404).json({ error: 'Trainer not found' });
    }
    res.json(foundTrainer);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update a trainer
const updateTrainer = async (req, res) => {
    try {
        const trainer = await TrainerModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!trainer) {
          return res.status(404).json({ error: 'Trainer not found' });
        }
        res.json(trainer);
  } catch (err) {
    res.status(400).json({ error: 'Invalid Request' });
  }
};

// Delete a trainer
const deleteTrainer = async (req, res) => {
  try {
    const deletedTrainer = await TrainerModel.findByIdAndDelete(req.params.id);
    if (!deletedTrainer) {
      return res.status(404).json({ error: 'Trainer not found' });
    }
    res.json({ message: 'Trainer deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getTrainers,
  createTrainer,
  getTrainerById,
  updateTrainer,
  deleteTrainer
};
