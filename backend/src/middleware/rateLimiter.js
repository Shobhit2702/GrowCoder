import rateLimit from 'express-rate-limit';
import { config } from '../config/config.js';
import AppError from '../utils/AppError.js';

/**
 * Configure rate limiter middleware to prevent brute force/DOS attacks.
 */
export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: config.env === 'production' ? 100 : 1000, // Limit each IP to 100 requests per windowMs in production, 1000 in dev
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (req, res, next) => {
    next(new AppError(429, 'Too many requests from this IP, please try again after 15 minutes'));
  },
});
