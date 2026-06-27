import express from 'express';
import { getCoachPlan, postChatMessage } from '../controllers/coach.controller.js';
import { validate } from '../middleware/validate.js';
import { z } from 'zod';

const router = express.Router();

const getCoachSchema = z.object({
  params: z.object({
    username: z
      .string({
        required_error: 'Username parameter is required',
      })
      .trim()
      .min(1, 'Username parameter cannot be empty'),
  }),
});

const postChatSchema = z.object({
  body: z.object({
    username: z
      .string({
        required_error: 'Username is required',
      })
      .trim()
      .min(1, 'Username cannot be empty'),
    message: z
      .string({
        required_error: 'Message is required',
      })
      .trim()
      .min(1, 'Message cannot be empty'),
  }),
});

router.get('/:username', validate(getCoachSchema), getCoachPlan);
router.post('/chat', validate(postChatSchema), postChatMessage);

export default router;
