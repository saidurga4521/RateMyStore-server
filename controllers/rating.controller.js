import Rating from "../models/rating.model.js";
import sendResponse from "../utils/response.js";

export const submitRating = async (req, res) => {
  const { storeId, rating } = req.body;
  try {
    let existing = await Rating.findOne({
      where: { userId: req.user.id, storeId },
    });
    if (existing) {
      existing.rating = rating;
      await existing.save();
      return sendResponse(
        res,
        true,
        "RatingUpdated",
        { rating: existing },
        200
      );
    }
    const newRating = await Rating.create({
      userId: req.user.id,
      storeId,
      rating,
    });
    sendResponse(res, true, "Rating Submitted", { rating: newRating }, 200);
  } catch (error) {
    sendResponse(res, false, error.message, null, 500);
  }
};
