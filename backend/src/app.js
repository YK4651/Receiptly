const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser'); // Add this line
const connectDB = require('./config/db');

// Import Routes
const authRoutes = require('./routes/auth');

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

// Initialize Express App
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Add this line to parse JSON bodies

// Routes Middleware
app.use('/api/auth', authRoutes);

// Default Route
app.get('/', (req, res) => {
  res.send('API is running');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));