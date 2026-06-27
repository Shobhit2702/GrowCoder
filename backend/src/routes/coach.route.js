import express from 'express';
import { getCoachPlan } from '../controllers/coach.controller.js';
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

router.get('/:username', validate(getCoachSchema), getCoachPlan);

export default router;
