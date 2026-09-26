const express = require('express');
const router = express.Router();
const { getAIWorkoutPlan } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

router.post('/plan', protect, getAIWorkoutPlan);

module.exports = router;