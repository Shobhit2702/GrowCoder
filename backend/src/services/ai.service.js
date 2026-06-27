import openai from '../config/openai.js';
import { config } from '../config/config.js';
import AppError from '../utils/AppError.js';

class AIService {
  /**
   * Generates a structured JSON response from OpenAI chat completions.
   * 
   * @param {string} systemPrompt - Guidelines and context for the AI
   * @param {string} userPrompt - Specific request details
   * @param {Object} [jsonSchema=null] - Optional OpenAI JSON Schema object to strictly enforce the output structure
   * @returns {Promise<Object>} The parsed JSON object response
   */
  async generateStructuredJSON(systemPrompt, userPrompt, jsonSchema = null) {
    // 1. Verify that the API Key is configured
    if (!config.openai.apiKey || config.openai.apiKey === 'PLACEHOLDER_KEY') {
      throw new AppError(
        500,
        'OpenAI API integration is not configured. Please define the OPENAI_API_KEY environment variable in your .env file.'
      );
    }

    try {
      const messages = [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ];

      const options = {
        model: 'gpt-4o-mini', // Cost-effective, fast, and supports JSON mode/schema
        messages,
        temperature: 0.2 // Lower temperature for more consistent structured outputs
      };

      // 2. Configure structured outputs or basic JSON object format
      if (jsonSchema) {
        options.response_format = {
          type: 'json_schema',
          json_schema: jsonSchema
        };
      } else {
        // When using type "json_object", the prompts must contain the word "JSON"
        options.response_format = {
          type: 'json_object'
        };
        // Safely append JSON instruction to system prompt if not present
        if (!systemPrompt.toLowerCase().includes('json')) {
          messages[0].content = `${systemPrompt}\n\nIMPORTANT: You must return your response as a valid JSON object.`;
        }
      }

      // 3. Perform OpenAI API request
      const completion = await openai.chat.completions.create(options);
      
      const responseContent = completion.choices[0]?.message?.content;
      if (!responseContent) {
        throw new AppError(502, 'OpenAI returned an empty response');
      }

      // 4. Parse response string to JSON object
      try {
        return JSON.parse(responseContent);
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
   * Generates a raw text message response from OpenAI chat completions.
   * Supports full conversation history.
   * 
   * @param {string} systemPrompt - System context and instructions
   * @param {Array} conversationHistory - Array of stored messages: [{ sender: 'user' | 'ai', text: String }]
   * @param {string} userMessage - The new incoming message from the user
   * @returns {Promise<string>} The generated AI text response content
   */
  async generateTextResponse(systemPrompt, conversationHistory, userMessage) {
    if (!config.openai.apiKey || config.openai.apiKey === 'PLACEHOLDER_KEY') {
      throw new AppError(
        500,
        'OpenAI API integration is not configured. Please define the OPENAI_API_KEY environment variable in your .env file.'
      );
    }

    try {
      const messages = [
        { role: 'system', content: systemPrompt }
      ];

      // Convert stored message history to OpenAI Chat Completion message roles
      conversationHistory.forEach((msg) => {
        messages.push({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.text
        });
      });

      // Append new user message
      messages.push({
        role: 'user',
        content: userMessage
      });

      const options = {
        model: 'gpt-4o-mini',
        messages,
        temperature: 0.7
      };

      const completion = await openai.chat.completions.create(options);
      
      const responseContent = completion.choices[0]?.message?.content;
      if (!responseContent) {
        throw new AppError(502, 'OpenAI returned an empty response');
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
