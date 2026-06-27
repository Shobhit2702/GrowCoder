import mongoose from 'mongoose';
import catchAsync from '../utils/catchAsync.js';
import { config } from '../config/config.js';

// Mongoose connection state mappings
const mongoStateMap = {
  0: 'disconnected',
  1: 'connected',
  2: 'connecting',
  3: 'disconnecting',
};

/**
 * Health check controller endpoint.
 * Verifies system uptime, current env, and MongoDB connection status.
 */
export const getHealth = catchAsync(async (req, res) => {
  const dbStatus = mongoStateMap[mongoose.connection.readyState] || 'unknown';
  
  res.status(200).json({
    status: 'success',
    data: {
      uptime: process.uptime(),
      environment: config.env,
      database: {
        status: dbStatus,
        readyState: mongoose.connection.readyState,
      },
      timestamp: new Date().toISOString(),
    },
  });
});
