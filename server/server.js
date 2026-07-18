const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import the database setup and route modules
const connectDB = require('./config/db');
const healthRoutes = require('./routes/healthRoutes');
const authRoutes = require('./routes/authRoutes');
const incidentRoutes = require('./routes/incidentRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware allows the frontend to call the backend safely
app.use(cors());
app.use(express.json());

// Connect to MongoDB when the server starts
connectDB();

// Mount all API routes under /api
app.use('/api', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', incidentRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
