import express from 'express';
import healthRoutes from './health.route.js';
import authRoutes from './auth.route.js';
import dashboardRoutes from './dashboard.route.js';
import weaknessRoutes from './weakness.route.js';
import coachRoutes from './coach.route.js';
import achievementsRoutes from './achievements.route.js';
import User from '../models/user.model.js';
import authService from '../services/auth.service.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/AppError.js';

const router = express.Router();

// Define API routes
const apiRoutes = [
  {
    path: '/health',
    route: healthRoutes,
  },
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/dashboard',
    route: dashboardRoutes,
  },
  {
    path: '/analysis',
    route: weaknessRoutes,
  },
  {
    path: '/coach',
    route: coachRoutes,
  },
  {
    path: '/achievements',
    route: achievementsRoutes,
  },
];

// Mount all routes onto the master router
apiRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

router.get('/recommendations/:username', catchAsync(async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ username: username.toLowerCase() });
  if (!user) throw new AppError(404, 'User not found');
  const mainTopic = user.aiAnalysis?.dailyPlan?.topic || 'Dynamic Programming';
  const recs = (user.aiAnalysis?.recommendations || []).map((r) => ({
    problemId: r.problemId || "100",
    title: r.title,
    difficulty: r.difficulty,
    topic: r.topic || mainTopic,
    leetcodeUrl: r.leetcodeUrl || `https://leetcode.com/problems/${r.title.toLowerCase().replace(/\s+/g, '-')}`,
    aiReason: r.reason || r.aiReason
  }));
  res.status(200).json(recs);
}));

router.get('/contest/:username', catchAsync(async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ username: username.toLowerCase() });
  if (!user) throw new AppError(404, 'User not found');
  const upcoming = await authService.getUpcomingContest();
  res.status(200).json({
    currentRating: user.contestRanking?.rating !== undefined ? user.contestRanking.rating : 0,
    contestRank: user.contestRanking?.globalRanking !== undefined ? user.contestRanking.globalRanking : 'N/A',
    contestsParticipated: user.contestRanking?.attendedContestsCount || 0,
    upcomingContest: {
      title: upcoming.title,
      startTime: upcoming.startTime
    },
    registrationUrl: upcoming.registrationUrl
  });
}));

export default router;
