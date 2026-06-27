/**
 * Wraps an asynchronous Express route handler to catch any promise rejections
 * and automatically forward them to the next middleware (the global error handler).
 * 
 * @param {Function} fn - Async express route handler function
 * @returns {Function} Express middleware function
 */
const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

export default catchAsync;
