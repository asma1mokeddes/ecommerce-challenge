import { DataTypes, Model } from "sequelize";
import sequelize from "../config/config.js";

class Promo extends Model {}

Promo.init(
  {
    promoID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    description: DataTypes.TEXT,
    discountRate: DataTypes.DECIMAL,
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    productID: DataTypes.INTEGER,
    // Additional fields as necessary
  },
  { sequelize, modelName: "Promo" }
);

export default Promo;
