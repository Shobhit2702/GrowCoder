import { z } from 'zod';

export const syncSchema = z.object({
  body: z.object({
    username: z
      .string({
        required_error: 'Username is required',
      })
      .trim()
      .min(1, 'Username cannot be empty')
      .max(50, 'Username cannot exceed 50 characters')
      .regex(
        /^[a-zA-Z0-9_-]+$/,
        'Username can only contain alphanumeric characters, underscores, and hyphens'
      ),
  }),
});
