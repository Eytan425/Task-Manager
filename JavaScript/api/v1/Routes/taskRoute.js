const express = require('express');
const router = express.Router();
const taskController = require('../Controller/taskController');

// Create a new task
router.post('/create', taskController.createTask);

// Get all tasks
router.get('/get', taskController.getTasks);

// Update a task
router.put('/update', taskController.updateTask);

// Delete a task
router.delete('/delete', taskController.deleteTask);

// Delete all tasks
router.delete('/deleteAll', taskController.deleteAllTasks);

//Search for a task
router.get('/search', taskController.searchTasks);

//Show hidden tasks
router.get('/hidden', taskController.showHidden);

module.exports = router;



