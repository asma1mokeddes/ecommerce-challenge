import { DataTypes, Model } from "sequelize";
import sequelize from "../config/config.js";

class Alert extends Model {}

Alert.init(
  {
    alertID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: DataTypes.STRING, // e.g., 'New Product', 'Restock', 'Price Change'
    isEnabled: DataTypes.BOOLEAN,
    // Additional fields as necessary
  },
  { sequelize, modelName: "Alert" }
);

export default Alert;
