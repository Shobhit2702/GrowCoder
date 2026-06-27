import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import { config } from './config/config.js';
import { rateLimiter } from './middleware/rateLimiter.js';
import { errorHandler } from './middleware/errorHandler.js';
import routes from './routes/index.js';
import weaknessRoutes from './routes/weakness.route.js';
import coachRoutes from './routes/coach.route.js';
import achievementsRoutes from './routes/achievements.route.js';
import AppError from './utils/AppError.js';

const app = express();

// 1. HTTP Security headers
app.use(helmet());

// 2. Logging middleware
if (config.env !== 'test') {
  app.use(morgan(config.env === 'development' ? 'dev' : 'combined'));
}

// 3. Enable Cross-Origin Resource Sharing (CORS)
app.use(cors({
  origin: config.cors.origin,
  credentials: true,
}));

// 4. Request parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 5. Rate limiting for security
app.use('/api', rateLimiter);

// 6. Mount API v1 routes
app.use('/api/v1', routes);

// 6b. Mount weakness analysis route at root /api/analysis
app.use('/api/analysis', weaknessRoutes);

// 6c. Mount AI Coach route at root /api/coach
app.use('/api/coach', coachRoutes);

// 6d. Mount Achievements route at root /api/achievements
app.use('/api/achievements', achievementsRoutes);

// 7. Route not found (404) fallback
app.use((req, res, next) => {
  next(new AppError(404, `Route ${req.originalUrl} not found`));
});

// 8. Global error handling middleware (must be registered last)
app.use(errorHandler);

export default app;
