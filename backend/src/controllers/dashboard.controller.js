import catchAsync from '../utils/catchAsync.js';
import userRepository from '../repositories/user.repository.js';
import authService from '../services/auth.service.js';
import aiAnalysisRepository from '../repositories/aiAnalysis.repository.js';
import analyticsService from '../services/analytics.service.js';
import AppError from '../utils/AppError.js';

/**
 * Controller endpoint to retrieve normalized dashboard data for a synced LeetCode user.
 */
export const getDashboardData = catchAsync(async (req, res) => {
  const { username } = req.params;

  const user = await userRepository.findByUsername(username);

  if (!user) {
    throw new AppError(
      404, 
      `LeetCode profile for "${username}" has not been synced yet. Please perform a profile sync first.`
    );
  }

  // Retrieve stored AI Summary response from separate AIAnalysis collection
  const aiInsight = await aiAnalysisRepository.findByUsername(username);

  const dashboardPayload = await authService.formatDashboardPayload(user, aiInsight);

  res.status(200).json({
    status: 'success',
    data: dashboardPayload
  });
});

export const updateSettings = catchAsync(async (req, res) => {
  const { username } = req.params;
  const { dailyTarget } = req.body;
  
  const user = await userRepository.findByUsername(username);
  if (!user) {
    throw new AppError(404, 'User not found');
  }
  
  user.dailyTarget = dailyTarget || 4;
  
  const aiAnalysis = await analyticsService.generateUserAnalytics(user, user.dailyTarget);
  user.aiAnalysis = aiAnalysis;
  user.markModified('aiAnalysis');
  await user.save();
  
  const aiInsight = await aiAnalysisRepository.findByUsername(username);
  const dashboardPayload = await authService.formatDashboardPayload(user, aiInsight);
  
  res.status(200).json({
    status: 'success',
    data: dashboardPayload
  });
});

export const startDrill = catchAsync(async (req, res) => {
  const { username } = req.params;
  const { topic } = req.body;
  
  const user = await userRepository.findByUsername(username);
  if (!user) {
    throw new AppError(404, 'User not found');
  }
  
  const dailyTarget = user.dailyTarget || 4;
  const drillAnalytics = await analyticsService.generateDrillAnalytics(user, topic, dailyTarget);
  
  user.aiAnalysis.recommendations = drillAnalytics.recommendations;
  user.aiAnalysis.checklist = drillAnalytics.checklist;
  user.aiAnalysis.dailyPlan = drillAnalytics.dailyPlan;
  
  user.markModified('aiAnalysis');
  await user.save();
  
  const aiInsight = await aiAnalysisRepository.findByUsername(username);
  const dashboardPayload = await authService.formatDashboardPayload(user, aiInsight);
  
  res.status(200).json({
    status: 'success',
    data: dashboardPayload
  });
});
