import sendResponse from "../utils/response.js";
export const authorizeRoles =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return sendResponse(res, false, "Access denied", null, 403);
    }
    next();
  };
