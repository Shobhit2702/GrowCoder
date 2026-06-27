import { config } from '../config/config.js';
import AppError from '../utils/AppError.js';

// Format MongoDB Cast Errors (e.g., invalid ObjectId)
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(400, message);
};

// Format MongoDB Duplicate Key Errors
const handleDuplicateFieldsDB = (err) => {
  // Regex to extract the duplicate value between quotes
  const match = err.message.match(/(["'])(\\?.)*?\1/);
  const value = match ? match[0] : '';
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(409, message);
};

// Format Mongoose Validation Errors
const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join(' ')}`;
  return new AppError(400, message, err.errors);
};

// Format Zod Schema Validation Errors
const handleZodError = (err) => {
  const formattedErrors = {};
  const issues = err.issues || err.errors || [];
  issues.forEach((issue) => {
    // Join the path array, e.g., ['body', 'email'] -> 'email' (by omitting standard request root properties if needed)
    const fieldPath = issue.path.slice(1).join('.') || issue.path.join('.');
    formattedErrors[fieldPath] = issue.message;
  });
  return new AppError(400, 'Validation failed', formattedErrors);
};

const sendErrorDev = (err, req, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    errors: err.errors,
    stack: err.stack,
  });
};

const sendErrorProd = (err, req, res) => {
  // Operational, trusted error: send structured message to client
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      errors: err.errors,
    });
  }

  // Programming or unknown error: log it privately, send generic response
  console.error('💥 ERROR:', err);
  return res.status(500).json({
    status: 'error',
    message: 'Something went wrong on the server',
  });
};

/**
 * Global Express Error Handling Middleware.
 */
export const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  let error = { ...err };
  error.message = err.message;
  error.stack = err.stack;

  // Handle standard node/express and mongoose/zod error names
  if (err.name === 'CastError') {
    error = handleCastErrorDB(err);
  } else if (err.code === 11000) {
    error = handleDuplicateFieldsDB(err);
  } else if (err.name === 'ValidationError') {
    error = handleValidationErrorDB(err);
  } else if (err.name === 'ZodError' || err.isZod) {
    error = handleZodError(err);
  }

  if (config.env === 'development') {
    sendErrorDev(error, req, res);
  } else {
    sendErrorProd(error, req, res);
  }
};
