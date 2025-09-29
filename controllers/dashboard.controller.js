import User from "../models/user.model.js";
import Store from "../models/store.model.js";
import Rating from "../models/rating.model.js";
import sendResponse from "../utils/response.js";
export const getAdminDashboard = async (req, res) => {
  try {
    const totalUsers = await User.count();
    const totalStores = await Store.count();
    const totalRatings = await Rating.count();
    sendResponse(
      res,
      true,
      "stats fetch successfully",
      {
        totalUsers,
        totalStores,
        totalRatings,
      },
      200
    );
  } catch (error) {
    sendResponse(res, false, error.message, null, 500);
  }
};
