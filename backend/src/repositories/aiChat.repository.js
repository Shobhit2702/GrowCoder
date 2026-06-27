import AIChat from '../models/aiChat.model.js';

class AIChatRepository {
  /**
   * Find stored AI Chat conversation history by username.
   * 
   * @param {string} username - LeetCode username
   * @returns {Promise<AIChat|null>} AI Chat document or null
   */
  async findByUsername(username) {
    return AIChat.findOne({ username: username.toLowerCase() });
  }

  /**
   * Append a new message to the chat history of a user.
   * Creates the chat document if it doesn't exist yet.
   * 
   * @param {string} username - LeetCode username
   * @param {Object} message - { sender: 'user' | 'ai', text: String }
   * @returns {Promise<AIChat>} Updated AIChat document
   */
  async appendMessage(username, message) {
    const formattedUsername = username.toLowerCase();
    
    return AIChat.findOneAndUpdate(
      { username: formattedUsername },
      { 
        $push: { messages: message },
        username: formattedUsername
      },
      { 
        new: true,
        upsert: true,
        runValidators: true
      }
    );
  }
}

export default new AIChatRepository();
