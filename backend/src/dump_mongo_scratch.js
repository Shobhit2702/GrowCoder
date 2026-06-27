import mongoose from 'mongoose';
import User from './models/user.model.js';
import authService from './services/auth.service.js';

const MONGODB_URI = 'mongodb://127.0.0.1:27017/growcode';

async function test() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB.');
  
  const user = await User.findOne({ username: 'lee215' });
  if (user) {
    console.log('Found user lee215.');
    const formatted = await authService.formatDashboardPayload(user);
    console.log('Formatted contest data:', JSON.stringify(formatted.contest, null, 2));
    console.log('Formatted solved stats:', JSON.stringify(formatted.solvedStats, null, 2));
  } else {
    console.log('User lee215 not found.');
  }
  
  await mongoose.disconnect();
}

test();
