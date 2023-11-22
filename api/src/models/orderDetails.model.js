import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.config.js";

class OrderDetails extends Model {}

OrderDetails.init(
  {
    orderDetailsID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    orderID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: DataTypes.INTEGER,
    pricePerUnit: DataTypes.DECIMAL,
    // Additional fields as necessary
  },
  { sequelize, modelName: "OrderDetails" }
);

export default OrderDetails;
