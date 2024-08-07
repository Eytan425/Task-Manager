const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const users = require('../Model/users');
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const Task = require('../Model/task');

const registerUser = async (req, res) => {
  try {
    const { Email, UserName, PhoneNumber, UserPassword } = req.body;

    const existingUser = await users.findOne({ Email });
    if (existingUser) {
      return res.status(401).json({ message: 'Email already registered' });
    }

    // Hash the password before saving the user
    const saltRounds = 10; // Adjust salt rounds as needed
    const hashedPassword = await bcrypt.hash(UserPassword, saltRounds);

    const newUser = new users({
      _id: new mongoose.Types.ObjectId(),
      Email,
      UserName,
      PhoneNumber,
      UserPassword: hashedPassword // Store the hashed password
    });

    const savedUser = await newUser.save();
    return res.status(201).json({ message: 'User registered successfully', user: savedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const loginUser = async (req, res) => {
  const { Email, UserPassword } = req.body;
  try {
    const foundUser = await users.findOne({ Email });
    if (foundUser == false) {
      return res.status(403).json({ message: "User not Found" });
    }

    const isMatch = await bcrypt.compare(UserPassword, foundUser.UserPassword);
    if (isMatch == false) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    return res.status(200).json({ message: "Login successful", id: foundUser.id, foundUser });
  } catch (err) {
    return res.status(500).json({ error: ` ${err.message}` });
  }
};
const DeleteUser = async (req, res) =>
{
  try{
    const {id} = req.body;
    const ResetAll = await users.findByIdAndDelete(id);
    
    res.status(200).json({message: "The user has beed deleted!"});
  }catch(error){
    console.error(error);
    res.status(500).json({message: "Error deleting user!"});
  }
};

const getUsers = async (req, res) =>
{
  try{
    const showUsers = await users.find().select('Email Username PhoneNumber');
    res.status(200).json(showUsers);
  }catch(error){
    console.error(error);
    res.status(500).json({ message: 'Error getting users' }); 
  }
  
}

module.exports = {
  registerUser,
  loginUser,
  DeleteUser,
  getUsers,
};
