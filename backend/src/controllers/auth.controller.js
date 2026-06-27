import catchAsync from '../utils/catchAsync.js';
import authService from '../services/auth.service.js';

/**
 * Controller endpoint to handle user synchronization request.
 * Invokes the service layer to fetch, upsert, and return the dashboard payload.
 */
export const syncLeetCodeUser = catchAsync(async (req, res) => {
  const { username } = req.body;

  const dashboardData = await authService.syncUserProfile(username);

  res.status(200).json({
    status: 'success',
    message: 'Profile synchronized successfully',
    data: dashboardData
  });
});
