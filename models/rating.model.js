import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./user.model.js";
import Store from "./store.model.js";

const Rating = sequelize.define("Rating", {
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 1, max: 5 },
  },
});

// Associations
Rating.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Rating, { foreignKey: "userId" });

Rating.belongsTo(Store, { foreignKey: "storeId" });
Store.hasMany(Rating, { foreignKey: "storeId" });

export default Rating;
