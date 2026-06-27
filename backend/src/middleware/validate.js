import AppError from '../utils/AppError.js';

/**
 * Express middleware to validate request parameters, query strings, and request bodies using Zod.
 * 
 * @param {import('zod').AnyZodObject} schema - Zod validation schema
 * @returns {import('express').RequestHandler}
 */
export const validate = (schema) => async (req, res, next) => {
  try {
    const parsed = await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    
    // Assign parsed data back to request to utilize any Zod defaults, coercion, or transformations
    if (parsed.body) req.body = parsed.body;
    if (parsed.query) Object.assign(req.query, parsed.query);
    if (parsed.params) Object.assign(req.params, parsed.params);
    
    return next();
  } catch (error) {
    if (error.name === 'ZodError') {
      error.isZod = true;
    }
    return next(error);
  }
};
