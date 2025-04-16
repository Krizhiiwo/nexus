import express from 'express';
import axios from 'axios';

const router = express.Router();

router.post('/generate-topics', async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ message: 'Prompt is required' });
    }

    const systemPrompt = `You are a helpful assistant that generates 3 relevant topic options based on user prompts.
Format your response as a JSON array of exactly 3 topic strings. Example: ["topic 1", "topic 2", "topic 3"]`;

    const response = await axios.post('http://localhost:11434/api/generate', {
      model: "llama2",
      prompt: `${systemPrompt}\n\nUser prompt: ${prompt}`,
      stream: false,
    });

    const fullResponse = response.data.response;
    const jsonMatch = fullResponse.match(/\[.*\]/s);
    if (jsonMatch) {
      const topics = JSON.parse(jsonMatch[0]);
      return res.json({ topics });
    }

    const lines = fullResponse.split('\n').filter(Boolean);
    const topics = lines.slice(0, 3).map(line => line.replace(/^\d+\.\s*/, '').trim());
    return res.json({ topics });
  } catch (error) {
    console.error('Error generating topics:', error.message);
    res.status(500).json({ message: 'Failed to generate topics', error: error.message });
  }
});

export default router;



