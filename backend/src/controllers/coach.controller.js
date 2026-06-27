import catchAsync from '../utils/catchAsync.js';
import aiCoachRepository from '../repositories/aiCoach.repository.js';
import AppError from '../utils/AppError.js';

/**
 * Controller endpoint to retrieve stored AI Coach plans for a synced LeetCode user.
 */
export const getCoachPlan = catchAsync(async (req, res) => {
  const { username } = req.params;

  const coachPlan = await aiCoachRepository.findByUsername(username);

  if (!coachPlan) {
    throw new AppError(
      404,
      `AI Coach plan for "${username}" has not been generated yet. Please perform a profile sync first.`
    );
  }

  res.status(200).json({
    status: 'success',
    data: coachPlan
  });
});
