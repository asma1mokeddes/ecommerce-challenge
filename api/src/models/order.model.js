import { DataTypes, Model } from "sequelize";
import sequelize from "../config/config.js";

class Order extends Model {}

Order.init(
  {
    orderID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dateCreated: DataTypes.DATE,
    status: DataTypes.STRING,
    totalPrice: DataTypes.DECIMAL,
    // Add other relevant fields
  },
  { sequelize, modelName: "Order" }
);

export default Order;
