/**
 * Custom Error class for operational (expected) errors.
 * Extends the built-in JavaScript Error.
 */
class AppError extends Error {
  /**
   * @param {number} statusCode - HTTP status code (e.g., 400, 404, 500)
   * @param {string} message - Error description
   * @param {any} [errors=null] - Additional validation or structured error data
   */
  constructor(statusCode, message, errors = null) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    this.errors = errors;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
