const express = require('express');

const app = express();
const cors = require('cors');

// Enable CORS
app.use(cors());

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/user', require('./routes/userRoutes'));
module.exports = app;
