import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./user.model.js";

const Store = sequelize.define("Store", {
  name: { type: DataTypes.STRING(60), allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  address: { type: DataTypes.STRING(400), allowNull: false },
});

Store.belongsTo(User, { as: "owner", foreignKey: "ownerId" });
User.hasMany(Store, { as: "stores", foreignKey: "ownerId" });

export default Store;
