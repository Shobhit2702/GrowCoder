import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { z } from 'zod';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from the parent directory's .env file
dotenv.config({ path: path.join(__dirname, '../../.env') });

// Define environment schema using Zod
const envVarsSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(5000),
  MONGODB_URI: z.string({
    required_error: 'MONGODB_URI is required',
  }).url('MONGODB_URI must be a valid URL starting with mongodb:// or mongodb+srv://'),
  CORS_ORIGIN: z.string().default('http://localhost:5173'),
  GEMINI_API_KEY: z.string().optional(),
  SYNC_JOB_INTERVAL_MS: z.coerce.number().default(86400000),
});

// Safe parse environment variables
const parsedEnv = envVarsSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('❌ Environment validation failed:');
  parsedEnv.error.errors.forEach((err) => {
    console.error(`   - ${err.path.join('.')}: ${err.message}`);
  });
  process.exit(1);
}

export const config = {
  env: parsedEnv.data.NODE_ENV,
  port: parsedEnv.data.PORT,
  mongoose: {
    url: parsedEnv.data.MONGODB_URI,
    options: {
      autoIndex: true, // Auto-build indexes (convenient in development)
    },
  },
  cors: {
    origin: parsedEnv.data.CORS_ORIGIN.includes(',')
      ? parsedEnv.data.CORS_ORIGIN.split(',').map((o) => o.trim())
      : parsedEnv.data.CORS_ORIGIN,
  },
  gemini: {
    apiKey: parsedEnv.data.GEMINI_API_KEY || '',
  },
  syncJobIntervalMs: parsedEnv.data.SYNC_JOB_INTERVAL_MS,
};
