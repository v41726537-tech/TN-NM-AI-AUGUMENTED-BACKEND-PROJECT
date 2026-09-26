const { generateWorkoutPlan } = require('../services/aiService');

const getAIWorkoutPlan = async (req, res) => {
  try {
    const { goal, fitnessLevel, duration, preferences } = req.body;

    if (!goal || !fitnessLevel) {
      return res.status(400).json({ message: 'Goal and fitness level are required' });
    }

    const aiPlan = await generateWorkoutPlan({
      goal,
      fitnessLevel,
      duration: duration || 30,
      preferences: preferences || 'Bodyweight exercises',
    });

    let parsedPlan;
    try {
      parsedPlan = JSON.parse(aiPlan);
    } catch {
      parsedPlan = { rawPlan: aiPlan };
    }

    res.status(200).json({
      success: true,
      data: parsedPlan,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAIWorkoutPlan };