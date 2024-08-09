require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const taskRoutes = require('./api/v1/Routes/taskRoute'); // Corrected path
const userRoutes = require('./api/v1/Routes/userRoute');

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware to parse JSON request bodies
app.use(express.json());

// Use the task routes
app.use('/api/tasks', taskRoutes);
app.use('/api/users',userRoutes)

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
