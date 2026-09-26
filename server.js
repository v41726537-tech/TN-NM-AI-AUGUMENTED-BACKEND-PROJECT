const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');

dotenv.config();

// MongoDB connect
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/workouts', require('./src/routes/workoutRoutes'));
app.use('/api/ai', require('./src/routes/aiRoutes'));

// Test route
app.get('/', (req, res) => {
  res.send('FitTrack AI Backend API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});