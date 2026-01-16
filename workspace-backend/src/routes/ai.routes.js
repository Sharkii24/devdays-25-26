import { generateAIResponse, generateAIResponseWithProvider } from "../controllers/ai.controller.js";
import { Router } from 'express';

const aiRouter = Router();

aiRouter.post('/ai/chat', generateAIResponse);
aiRouter.post('/ai/chat/provider', generateAIResponseWithProvider);

export { aiRouter };