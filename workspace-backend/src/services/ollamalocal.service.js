import ollama from 'ollama';

export const generateText = async (prompt) => {
    const response = await ollama.chat({
        model: 'llama3.2:1b',
        messages: [{
            role: 'user',
            content: prompt
        }]
    });
    return response.message.content;
};