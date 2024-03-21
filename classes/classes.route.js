const express = require('express'); 
const router = express.Router();

const {
    getClasses,
  createClass,
  getClassById,
  updateClass,
  deleteClass  
} = require('./classes.controller');

router.get('/allclasses', getClasses);
router.post('/newclass', createClass);
router.get('/getclass/:id', getClassById);
router.put('/updateclass/:id', updateClass);
router.delete('/deleteclass/:id', deleteClass);

module.exports = router;