import { generateText as generateTextOpenAI } from "../services/openai.service.js";
import { generateText as generateTextOllama } from "../services/ollama.service.js";
import { generateText as generateTextOllamaLocal } from "../services/ollamalocal.service.js";

export const generateAIResponse = async (req, res) => {
    try {
        const { prompt } = req.body;

        const aiResponse = await generateTextOllamaLocal(prompt);
        res.status(200).json({ response: aiResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const aiServices = {
    'openai': generateTextOpenAI,
    'ollama': generateTextOllama,
    'ollama-local': generateTextOllamaLocal
};

export const generateAIResponseWithProvider = async (req, res) => {
    try {
        const { prompt, provider = 'ollama-local' } = req.body;

        const selectedService = aiServices[provider];

        if (!selectedService)
            return res.status(400).json({ message: 'Provider dont compatible, you must to choose \'openai\', \'ollama\' or \'ollama-local\'.'});

        const aiResponse = await selectedService(prompt);
        res.status(200).json({ response: aiResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};