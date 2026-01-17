export const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  res.status(401).json({
    status: 'fail',
    message: 'You are not authorized. Please log in.',
  });
};
