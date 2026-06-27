import WeaknessAnalysis from '../models/weaknessAnalysis.model.js';

class WeaknessAnalysisRepository {
  /**
   * Find stored weakness analysis by username (case-insensitive).
   * 
   * @param {string} username - LeetCode username
   * @returns {Promise<WeaknessAnalysis|null>} Weakness Analysis document or null
   */
  async findByUsername(username) {
    return WeaknessAnalysis.findOne({ username: username.toLowerCase() });
  }

  /**
   * Create or update stored weakness analysis for a user.
   * 
   * @param {string} username - LeetCode username
   * @param {Object} updateData - Key-values to update
   * @returns {Promise<WeaknessAnalysis>} Updated Weakness Analysis document
   */
  async upsertByUsername(username, updateData) {
    const formattedUsername = username.toLowerCase();
    
    return WeaknessAnalysis.findOneAndUpdate(
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

export default new WeaknessAnalysisRepository();
