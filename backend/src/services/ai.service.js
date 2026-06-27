import gemini from '../config/gemini.js';
import { config } from '../config/config.js';
import AppError from '../utils/AppError.js';

class AIService {
  /**
   * Generates a structured JSON response from Gemini chat completions.
   * 
   * @param {string} systemPrompt - Guidelines and context for the AI
   * @param {string} userPrompt - Specific request details
   * @param {Object} [jsonSchema=null] - Optional JSON Schema object to strictly enforce the output structure
   * @returns {Promise<Object>} The parsed JSON object response
   */
  async generateStructuredJSON(systemPrompt, userPrompt, jsonSchema = null) {
    // 1. Verify that the API Key is configured
    if (!config.gemini.apiKey || config.gemini.apiKey === 'PLACEHOLDER_KEY') {
      throw new AppError(
        500,
        'Gemini API integration is not configured. Please define the GEMINI_API_KEY environment variable in your .env file.'
      );
    }

    try {
      const configObj = {
        temperature: 0.2, // Lower temperature for more consistent structured outputs
        systemInstruction: systemPrompt
      };

      if (jsonSchema) {
        configObj.responseMimeType = 'application/json';
        configObj.responseSchema = jsonSchema.schema || jsonSchema;
      } else {
        configObj.responseMimeType = 'application/json';
        // Safely append JSON instruction to system prompt if not present
        if (!systemPrompt.toLowerCase().includes('json')) {
          configObj.systemInstruction = `${systemPrompt}\n\nIMPORTANT: You must return your response as a valid JSON object.`;
        }
      }

      // 2. Perform Gemini API request
      const response = await gemini.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: userPrompt,
        config: configObj
      });

      const responseContent = response.text;
      if (!responseContent) {
        throw new AppError(502, 'Gemini returned an empty response');
      }

      // 3. Parse response string to JSON object
      let cleanText = responseContent.trim();
      if (cleanText.startsWith('```')) {
        cleanText = cleanText.replace(/^```(?:json)?\n?|```$/g, '').trim();
      }

      try {
        return JSON.parse(cleanText);
      } catch (parseError) {
        console.error('Failed to parse AI JSON response:', responseContent);
        throw new AppError(502, 'AI model output failed to parse as valid JSON');
      }
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(
        error.status || 500,
        `AI Service error: ${error.message}`
      );
    }
  }

  /**
   * Generates a raw text message response from Gemini chat completions.
   * Supports full conversation history.
   * 
   * @param {string} systemPrompt - System context and instructions
   * @param {Array} conversationHistory - Array of stored messages: [{ sender: 'user' | 'ai', text: String }]
   * @param {string} userMessage - The new incoming message from the user
   * @returns {Promise<string>} The generated AI text response content
   */
  async generateTextResponse(systemPrompt, conversationHistory, userMessage) {
    if (!config.gemini.apiKey || config.gemini.apiKey === 'PLACEHOLDER_KEY') {
      throw new AppError(
        500,
        'Gemini API integration is not configured. Please define the GEMINI_API_KEY environment variable in your .env file.'
      );
    }

    try {
      const contents = [];

      // Convert stored message history to Gemini contents format
      conversationHistory.forEach((msg) => {
        contents.push({
          role: msg.sender === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }]
        });
      });

      // Append new user message
      contents.push({
        role: 'user',
        parts: [{ text: userMessage }]
      });

      const options = {
        model: 'gemini-2.5-flash',
        contents,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.7
        }
      };

      const response = await gemini.models.generateContent(options);
      
      const responseContent = response.text;
      if (!responseContent) {
        throw new AppError(502, 'Gemini returned an empty response');
      }

      return responseContent;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(
        error.status || 500,
        `AI Service error: ${error.message}`
      );
    }
  }
}

export default new AIService();
