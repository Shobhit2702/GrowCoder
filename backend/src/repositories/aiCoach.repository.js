import AICoach from '../models/aiCoach.model.js';

class AICoachRepository {
  /**
   * Find stored AI Coach plan by username (case-insensitive).
   * 
   * @param {string} username - LeetCode username
   * @returns {Promise<AICoach|null>} AI Coach document or null
   */
  async findByUsername(username) {
    return AICoach.findOne({ username: username.toLowerCase() });
  }

  /**
   * Create or update stored AI Coach plan for a user.
   * 
   * @param {string} username - LeetCode username
   * @param {Object} updateData - Key-values to update
   * @returns {Promise<AICoach>} Updated AI Coach document
   */
  async upsertByUsername(username, updateData) {
    const formattedUsername = username.toLowerCase();
    
    return AICoach.findOneAndUpdate(
      { username: formattedUsername },
      { 
        ...updateData, 
        username: formattedUsername,
        lastGeneratedAt: new Date()
      },
      { 
        new: true, // Return updated doc
        upsert: true, // Create if missing
        runValidators: true // Enforce validation
      }
    );
  }
}

export default new AICoachRepository();
