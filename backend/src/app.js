const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const connectDB = require('./config/db');

// Import Routes
const authRoutes = require('./routes/auth');
const receiptRoutes = require('./routes/receipts');
const categoryRoutes = require('./routes/categories');
const reportRoutes = require('./routes/reports');
const notificationRoutes = require('./routes/notifications');
const teamRoutes = require('./routes/teams');
const invitationRoutes = require('./routes/invitations');
const userRoutes = require('./routes/user');

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

// Initialize Express App
const app = express();

// Middleware
app.use(cors());
// app.use(bodyParser.json());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(morgan('dev'));

// Routes Middleware
app.use('/api/auth', authRoutes);
app.use('/api/receipts', receiptRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/notifications', notificationRoutes);

app.use('/api/users', userRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/invitations', invitationRoutes);

// Default Route
app.get('/', (req, res) => {
  res.send('API is running');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));