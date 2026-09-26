const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const generateWorkoutPlan = async (userProfile) => {
  const { goal, fitnessLevel, duration, preferences } = userProfile;

  const prompt = `You are an expert fitness coach for FitTrack. Create a structured workout plan with the following details:
  - Goal: ${goal}
  - Fitness Level: ${fitnessLevel}
  - Duration per workout: ${duration} minutes
  - Preferences/Equipment: ${preferences}

  Return the response in clear JSON format with keys: title, description, weeklySchedule (array of days with exercises, sets, reps, and tips). Return raw JSON only, no markdown backticks.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3.5-flash-lite',
    contents: prompt,
  });

  return response.text;
};

module.exports = { generateWorkoutPlan };