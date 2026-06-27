import app from './app.js';
import { config } from './config/config.js';
import { connectDB } from './config/db.js';
import { runSyncJob } from './jobs/sync.job.js';

let server;

// 1. Handle uncaught exceptions (e.g. referencing an undefined variable)
process.on('uncaughtException', (err) => {
  console.error('💥 UNCAUGHT EXCEPTION! Shutting down...');
  console.error(err.name, ':', err.message);
  console.error(err.stack);
  process.exit(1);
});

// 2. Initialize Database connection and start server listening
const startServer = async () => {
  try {
    await connectDB();
    
    server = app.listen(config.port, () => {
      console.log(`🚀 Server running in ${config.env} mode on port ${config.port}`);
    });

    // 2b. Initialize scheduled background sync jobs
    if (config.env !== 'test') {
      console.log(`⏰ Scheduled sync job interval registered: every ${config.syncJobIntervalMs} ms.`);
      setInterval(async () => {
        try {
          await runSyncJob();
        } catch (err) {
          console.error('💥 Scheduled sync job interval execution failed:', err.message);
        }
      }, config.syncJobIntervalMs);
    }
  } catch (error) {
    console.error('💥 Database connection failed! Exiting process...');
    process.exit(1);
  }
};

startServer();

// 3. Handle unhandled promise rejections (e.g. failing database query without catch)
process.on('unhandledRejection', (err) => {
  console.error('💥 UNHANDLED REJECTION! Shutting down gracefully...');
  console.error(err.name, ':', err.message);
  if (err.stack) {
    console.error(err.stack);
  }
  
  if (server) {
    server.close(() => {
      console.log('🔌 HTTP server closed. Process terminated.');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});
