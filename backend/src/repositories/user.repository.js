import User from '../models/user.model.js';

class UserRepository {
  /**
   * Find a user by LeetCode username (case-insensitive).
   * 
   * @param {string} username - LeetCode username
   * @returns {Promise<User|null>} User document or null
   */
  async findByUsername(username) {
    return User.findOne({ username: username.toLowerCase() });
  }

  /**
   * Create or update a user's LeetCode profile data.
   * 
   * @param {string} username - LeetCode username
   * @param {Object} updateData - Normalized data payload to update
   * @returns {Promise<User>} Updated user document
   */
  async upsertByUsername(username, updateData) {
    const formattedUsername = username.toLowerCase();
    
    return User.findOneAndUpdate(
      { username: formattedUsername },
      { 
        ...updateData, 
        username: formattedUsername,
        lastSyncedAt: new Date()
      },
      { 
        new: true, // Return modified document
        upsert: true, // Create if doesn't exist
        runValidators: true // Validate schema
      }
    );
  }
}

export default new UserRepository();
