import userRepository from '../repositories/user.repository.js';
import weaknessAnalysisRepository from '../repositories/weaknessAnalysis.repository.js';
import aiCoachRepository from '../repositories/aiCoach.repository.js';
import aiChatRepository from '../repositories/aiChat.repository.js';
import aiService from './ai.service.js';
import { createChatSystemPrompt } from '../prompts/analytics.prompt.js';
import { config } from '../config/config.js';
import AppError from '../utils/AppError.js';

class ChatService {
  /**
   * Handle user chat coaching conversation.
   * Loads profile, weaknesses, recommendations, and conversation history,
   * queries OpenAI or falls back to offline heuristics, saves the interaction,
   * and returns the AI response.
   * 
   * @param {string} username - LeetCode username
   * @param {string} userMessage - User message text
   * @returns {Promise<Object>} The saved AI response message object: { sender: 'ai', text: String, timestamp: Date }
   */
  async handleChatConversation(username, userMessage) {
    const formattedUsername = username.toLowerCase();

    // 1. Load User Profile
    const user = await userRepository.findByUsername(formattedUsername);
    if (!user) {
      throw new AppError(
        404,
        `User profile for "${username}" has not been found. Please perform a profile sync first.`
      );
    }

    // 2. Load Weakness Analysis
    const weakness = await weaknessAnalysisRepository.findByUsername(formattedUsername);

    // 3. Load Recommendations (from AICoach)
    const coach = await aiCoachRepository.findByUsername(formattedUsername);

    // 4. Save User Message to history first
    const userMsgData = {
      sender: 'user',
      text: userMessage,
      timestamp: new Date()
    };
    await aiChatRepository.appendMessage(formattedUsername, userMsgData);

    // 5. Load existing conversation history (before this user message was appended)
    const chatDoc = await aiChatRepository.findByUsername(formattedUsername);
    // Get all messages prior to the one we just saved
    const messagesHistory = chatDoc && chatDoc.messages 
      ? chatDoc.messages.slice(0, -1) 
      : [];

    // 6. Generate AI response
    let aiResponseText = '';
    const hasKey = config.openai.apiKey && config.openai.apiKey !== 'PLACEHOLDER_KEY' && config.openai.apiKey.trim() !== '';

    if (hasKey) {
      try {
        console.log(`🤖 Requesting OpenAI Chat Coach response for: ${username}...`);
        const systemPrompt = createChatSystemPrompt(user, weakness, coach);
        aiResponseText = await aiService.generateTextResponse(systemPrompt, messagesHistory, userMessage);
        console.log('✅ OpenAI Chat Coach responded successfully.');
      } catch (error) {
        console.warn('⚠️ OpenAI Chat Coach API call failed. Falling back to offline heuristics.', error.message);
        aiResponseText = this.generateHeuristicChatResponse(userMessage, weakness, coach);
      }
    } else {
      console.log('ℹ️ OpenAI API key not configured. Using offline heuristics generator for chat.');
      aiResponseText = this.generateHeuristicChatResponse(userMessage, weakness, coach);
    }

    // 7. Save AI Response to history
    const aiMsgData = {
      sender: 'ai',
      text: aiResponseText,
      timestamp: new Date()
    };
    await aiChatRepository.appendMessage(formattedUsername, aiMsgData);

    return aiMsgData;
  }

  /**
   * Generates dynamic offline chat coaching responses based on weaknesses and recommended problems.
   */
  generateHeuristicChatResponse(userMessage, weakness, coach) {
    const mainWeakness = weakness?.weaknesses?.[0]?.weakness || 'Algorithms';
    const recProblem = coach?.recommendedProblems?.[0]?.title || 'Practice Problems';
    const lowercaseMsg = userMessage.toLowerCase();

    if (lowercaseMsg.includes('hello') || lowercaseMsg.includes('hi') || lowercaseMsg.includes('hey')) {
      return `Hello! I am your offline GrowCode AI Coach. I see you are currently focusing on resolving bottlenecks in **${mainWeakness}**. I recommend starting with the practice problem **${recProblem}**. What specific concept or edge case can we discuss?`;
    }
    
    if (lowercaseMsg.includes('hint') || lowercaseMsg.includes('help') || lowercaseMsg.includes('problem') || lowercaseMsg.includes('stuck')) {
      return `To tackle problems in **${mainWeakness}** (like **${recProblem}**), try breaking down the problem into smaller subproblems first:
1. Define your base cases carefully.
2. Write down the recurrence relation or state transition before writing any code.
3. Consider space complexity optimizations (e.g. rolling arrays).

How does your current approach match these guidelines?`;
    }
    
    if (lowercaseMsg.includes('complexity') || lowercaseMsg.includes('time') || lowercaseMsg.includes('space')) {
      return `For **${mainWeakness}** operations, optimal time complexity is usually linear or log-linear (O(N) or O(N log N)). If you are seeing Time Limit Exceeded (TLE), make sure you are not performing redundant calculations and check if you can memoize states.`;
    }

    return `I am operating in offline fallback mode. Based on your weakness analysis, your priority bottleneck is **${mainWeakness}**. We should focus on solidifying your transition formulas and runtime constraints. Let me know if you want hints for **${recProblem}** or general strategy tips.`;
  }
}

export default new ChatService();
