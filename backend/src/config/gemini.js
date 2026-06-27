import { GoogleGenAI } from '@google/genai';
import { config } from './config.js';

/**
 * Instantiate the Google Gemini client.
 * If the API key is not configured in the env, we pass a placeholder string
 * to prevent the SDK from throwing a synchronous instantiation error.
 * Validation of the key is handled dynamically in the AI Service.
 */
const geminiApiKey = config.gemini.apiKey || 'PLACEHOLDER_KEY';
const ai = new GoogleGenAI({ apiKey: geminiApiKey });

export default ai;
