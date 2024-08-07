const express = require('express');
const router = express.Router();
const userController = require('../Controller/userController');

// Route for user registration
router.post('/register', userController.registerUser);

// Route for user login
router.post('/login', userController.loginUser);

//Route for reseting everything
router.delete('/deleteUser', userController.DeleteUser);

//Route for showing all users
router.get('/allUsers', userController.getUsers);

module.exports = router;
