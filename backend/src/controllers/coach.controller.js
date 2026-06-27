import catchAsync from '../utils/catchAsync.js';
import aiCoachRepository from '../repositories/aiCoach.repository.js';
import chatService from '../services/chat.service.js';
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

/**
 * Controller endpoint to post a message to the AI Chat Coach and get a response.
 */
export const postChatMessage = catchAsync(async (req, res) => {
  const { username, message } = req.body;

  const aiMessage = await chatService.handleChatConversation(username, message);

  res.status(200).json({
    status: 'success',
    data: aiMessage
  });
});
