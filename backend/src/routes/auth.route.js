import express from 'express';
import { validate } from '../middleware/validate.js';
import { syncSchema } from '../validators/auth.validator.js';
import { syncLeetCodeUser } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/sync', validate(syncSchema), syncLeetCodeUser);

export default router;
