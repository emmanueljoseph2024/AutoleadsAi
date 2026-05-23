// Ensures userId is always injected into body for create operations
export const tenantContext = (req, res, next) => {
  if (req.user) {
    // For create operations, force userId to the authenticated user
    if (req.method === 'POST') {
      req.body.userId = req.user._id;
    }
  }
  next();
};