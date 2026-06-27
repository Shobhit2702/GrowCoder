import mongoose from 'mongoose';
import User from '../models/user.model.js';
import authService from '../services/auth.service.js';
import { config } from '../config/config.js';
import { fileURLToPath } from 'url';

/**
 * Executes LeetCode synchronization for all users registered in the database.
 * This triggers fetching updated LeetCode profile statistics, running the GPT analysis engine
 * to refresh Coding DNA, weakness analyses, and coach recommendations, and caching the updated data.
 */
export const runSyncJob = async () => {
  console.log('⏰ Starting scheduled LeetCode profile synchronization job...');
  try {
    const users = await User.find({}, 'username');
    console.log(`📋 Found ${users.length} users to synchronize.`);

    for (const user of users) {
      console.log(`🔄 Syncing user "${user.username}"...`);
      try {
        await authService.syncUserProfile(user.username);
        console.log(`✅ Synced user "${user.username}" successfully.`);
      } catch (err) {
        console.error(`💥 Failed to sync user "${user.username}":`, err.message);
      }
    }
    console.log('🏁 Scheduled synchronization job completed successfully.');
  } catch (error) {
    console.error('💥 Error running scheduled synchronization job:', error.message);
  }
};

// Auto-run if executed directly via Node CLI
const isDirectRun = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isDirectRun) {
  const execute = async () => {
    console.log('🏁 Executing standalone sync job...');
    try {
      await mongoose.connect(config.mongoose.url, config.mongoose.options);
      console.log('✅ Connected to MongoDB.');
      await runSyncJob();
    } catch (err) {
      console.error('💥 Standalone job execution failed:', err.message);
    } finally {
      await mongoose.disconnect();
      console.log('🔌 Closed MongoDB connection.');
      process.exit(0);
    }
  };
  execute();
}
