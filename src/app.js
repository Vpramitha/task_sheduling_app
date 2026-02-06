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

app.use('/api/company', require('./routes/companyRoutes'));
module.exports = app;
