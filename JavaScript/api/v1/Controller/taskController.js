
const Task = require('../Model/task'); // Import the Task model

const createTask = async (req, res) => {
    try {
      const { title, description, dueDate, reminderDate } = req.body; // Get task information from the request body
  
      // Create a new task
      const newTask = new Task({
        title,
        description,
        dueDate,
        reminderDate,
      });
  
      // Save the task to the database
      const savedTask = await newTask.save();
  
      res.status(201).json(savedTask); // Send a success response with the created task
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating task' }); // Handle errors
    }
  };
  
  const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({completed: false }).select('title description dueDate completed reminderDate'); // Specify fields to include
  
      res.status(200).json(tasks); // Send a success response with all tasks
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error getting tasks' }); // Handle errors
    }
  };

  const updateTask = async (req, res) => {
    try {
      const { id } = req.body;
      const updatedTask = req.body;
  
      const task = await Task.findByIdAndUpdate(id, updatedTask, { new: true });
  
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      res.status(200).json(task);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating task' });
    }
  };
  
  
  const deleteTask = async (req, res) => {
    try {
      const { id } = req.body;
  
      const deletedTask = await Task.findByIdAndDelete(id);
  
      if (!deletedTask) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting task' });
    }
  };



  const deleteAllTasks = async (req, res) => {
    try
    {
      const deletedAllTasks = await Task.deleteMany({});
      res.status(200).json({message: 'All tasks deleted succesfully'});
    }catch(error){
      console.error(error);
      res.status(500).json({message:'Error deleting all the tasks!'});
    }
    
  };
  const searchTasks = async (req, res) => {
    try {
      const { searchTerm } = req.body;
  
      
      const searchRegex = new RegExp(searchTerm, 'i');
  
      
      const tasks = await Task.find({
        $or: [
          { title: { $regex: searchRegex } },
          { description: { $regex: searchRegex } }
        ]
      });
      res.status(200).json(tasks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error searching tasks' });
    }
  };
  const showHidden = async (req, res) =>
  {
    try{
      const tasks = await Task.find({completed:true}).select('title description dueDate completed reminderDate');
      res.status(200).json(tasks);
    }catch(error)
    {
      console.error(error);
      res.status(500).json({message: "Couldn't show hidden tasks"})
    };
  }

// Other functions for updating and deleting tasks

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  deleteAllTasks,
  searchTasks,
  showHidden,
  // Other exported functions
};
