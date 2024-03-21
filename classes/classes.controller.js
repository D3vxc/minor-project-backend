const ClassModel = require('../classes/classes.model');

// Get all classes
const getClasses = async (req, res) => {
  try {
    const classes = await ClassModel.find();
    res.json(classes);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create a new class
const createClass = async (req, res) => {
    const { name, duration, description, trainer, date , time , image } = req.body;
  try {
    const newClass = await ClassModel.create({ 
        name, 
        description, 
        trainer, 
        date,
        time,
        duration,
        image,
    });
    res
    .status(201).json({ data: newClass, message: "Class created successfully" });
        } catch (err) {
    res.status(400).json({ error: 'Invalid Request' });
  }
};

// Get a class by ID
const getClassById = async (req, res) => {
  try {
    const foundClass = await ClassModel.findById(req.params.id);
    if (!foundClass) {
      return res.status(404).json({ error: 'Class not found' });
    }
    res.json(foundClass);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update a class
const updateClass = async (req, res) => {
  try {
    const classes = await ClassModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!classes) {
      return res.status(404).json({ error: "Classes not found" });
    }
    res.json(classes);
  } catch (err) {
    res.status(400).json({ error: 'Invalid Request' });
  }
};

// Delete a class
const deleteClass = async (req, res) => {
  try {
    const deletedClass = await ClassModel.findByIdAndDelete(req.params.id);
    if (!deletedClass) {
      return res.status(404).json({ error: 'Class not found' });
    }
    res.json({ message: 'Class deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getClasses,
  createClass,
  getClassById,
  updateClass,
  deleteClass
};
