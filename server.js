// Require dotenv to load environment variables
require('dotenv').config();  // Only call dotenv.config() once

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');  // Import MongoDB connection

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());  // For parsing application/json
app.use(cors());  // Enable Cross-Origin Request Sharing

// Example Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Server listen on the defined PORT or fallback to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
