import catchAsync from '../utils/catchAsync.js';
import weaknessAnalysisRepository from '../repositories/weaknessAnalysis.repository.js';
import AppError from '../utils/AppError.js';

/**
 * Controller endpoint to retrieve stored detailed weakness analysis for a synced LeetCode user.
 */
export const getWeaknessAnalysis = catchAsync(async (req, res) => {
  const { username } = req.params;

  const analysis = await weaknessAnalysisRepository.findByUsername(username);

  if (!analysis) {
    throw new AppError(
      404, 
      `Weakness analysis for "${username}" has not been generated yet. Please perform a profile sync first.`
    );
  }

  res.status(200).json({
    status: 'success',
    data: analysis
  });
});
