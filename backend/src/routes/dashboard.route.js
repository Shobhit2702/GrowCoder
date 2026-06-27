import express from 'express';
import { getDashboardData, updateSettings, startDrill } from '../controllers/dashboard.controller.js';
import { validate } from '../middleware/validate.js';
import { z } from 'zod';

const router = express.Router();

const getDashboardSchema = z.object({
  params: z.object({
    username: z
      .string({
        required_error: 'Username parameter is required',
      })
      .trim()
      .min(1, 'Username parameter cannot be empty'),
  }),
});

router.get('/:username', validate(getDashboardSchema), getDashboardData);
router.put('/:username/settings', updateSettings);
router.post('/:username/drill', startDrill);

export default router;
