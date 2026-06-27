import express from 'express';
import { getAchievements } from '../controllers/achievements.controller.js';
import { validate } from '../middleware/validate.js';
import { z } from 'zod';

const router = express.Router();

const getAchievementsSchema = z.object({
  params: z.object({
    username: z
      .string({
        required_error: 'Username parameter is required',
      })
      .trim()
      .min(1, 'Username parameter cannot be empty'),
  }),
});

router.get('/:username', validate(getAchievementsSchema), getAchievements);

export default router;
