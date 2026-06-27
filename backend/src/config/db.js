import mongoose from 'mongoose';
import { config } from './config.js';

/**
 * Establish connection to MongoDB using Mongoose.
 */
export const connectDB = async () => {
  try {
    // Listen for database connection events
    mongoose.connection.on('connected', () => {
      console.log('✅ MongoDB connected successfully');
    });

    mongoose.connection.on('error', (err) => {
      console.error(`❌ MongoDB connection error: ${err.message}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️ MongoDB connection disconnected');
    });

    // Handle termination signals to close DB connection gracefully
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('🔌 MongoDB connection closed due to application termination (SIGINT)');
      process.exit(0);
    });

    process.on('SIGTERM', async () => {
      await mongoose.connection.close();
      console.log('🔌 MongoDB connection closed due to application termination (SIGTERM)');
      process.exit(0);
    });

    // Make the connection
    await mongoose.connect(config.mongoose.url, config.mongoose.options);
  } catch (error) {
    console.error(`❌ Failed to connect to MongoDB: ${error.message}`);
    throw error;
  }
};
