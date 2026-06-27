import OpenAI from 'openai';
import { config } from './config.js';

/**
 * Instantiate the OpenAI client.
 * If the API key is not configured in the env, we pass a placeholder string
 * to prevent the SDK from throwing a synchronous instantiation error.
 * Validation of the key is handled dynamically in the AI Service.
 */
const openai = new OpenAI({
  apiKey: config.openai.apiKey || 'PLACEHOLDER_KEY',
});

export default openai;
