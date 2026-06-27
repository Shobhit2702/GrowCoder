import AIAnalysis from '../models/aiAnalysis.model.js';

class AIAnalysisRepository {
  /**
   * Find stored AI analysis by username (case-insensitive).
   * 
   * @param {string} username - LeetCode username
   * @returns {Promise<AIAnalysis|null>} AI Analysis document or null
   */
  async findByUsername(username) {
    return AIAnalysis.findOne({ username: username.toLowerCase() });
  }

  /**
   * Create or update stored AI analysis for a user.
   * 
   * @param {string} username - LeetCode username
   * @param {Object} updateData - Key-values to update
   * @returns {Promise<AIAnalysis>} Updated AI Analysis document
   */
  async upsertByUsername(username, updateData) {
    const formattedUsername = username.toLowerCase();
    
    return AIAnalysis.findOneAndUpdate(
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

export default new AIAnalysisRepository();
