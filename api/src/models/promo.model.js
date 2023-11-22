import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.config.js";

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
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    productID: DataTypes.INTEGER,
    // Additional fields as necessary
  },
  { sequelize, modelName: "Promo" }
);

export default Promo;
