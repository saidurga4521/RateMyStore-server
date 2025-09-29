import Store from "../models/store.model.js";
import Rating from "../models/rating.model.js";
import User from "../models/user.model.js";
import sendResponse from "../utils/response.js";
import sequelize from "../config/db.js";
//only admins
export const addStore = async (req, res) => {
  try {
    const { name, email, address, ownerId } = req.body;
    const user = await User.findByPk(ownerId);
    if (!user) {
      throw new Error("User with id=1 not found");
    }

    const store = await Store.create({ name, email, address, ownerId });

    sendResponse(res, "true", "add the store by admin", store, 200);
  } catch (error) {
    sendResponse(res, false, error.message, null, 500);
  }
};

//get stores with avg rating
export const getStores = async (req, res) => {
  try {
    const stores = await Store.findAll({
      include: [
        {
          model: Rating,
          attributes: [],
        },
        {
          model: User,
          as: "owner",
          attributes: ["id", "name", "email"],
        },
      ],
      attributes: {
        include: [
          [
            sequelize.fn("AVG", sequelize.col("Ratings.rating")),
            "averageRating",
          ],
        ],
      },
      group: ["Store.id"],
    });
    sendResponse(res, true, "stores with average rating", stores, 200);
  } catch (error) {
    sendResponse(res, false, error.message, null, 500);
  }
};

// Store Owner: Get users who rated their store
export const getStoreRatings = async (req, res) => {
  try {
    const stores = await Store.findAll({
      where: { ownerId: req.user.id },
      include: [
        {
          model: Rating,
          include: [{ model: User, attributes: ["id", "name", "email"] }],
        },
      ],
    });
    sendResponse(res, true, "users rated their store", stores, 200);
  } catch (error) {
    sendResponse(res, false, error.message, null, 500);
  }
};
