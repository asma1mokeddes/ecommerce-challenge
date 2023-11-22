import { DataTypes, Model } from "sequelize";
import sequelize from "../config/config.js";

class Brand extends Model {}

Brand.init(
  {
    brandID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    websiteURL: DataTypes.STRING,
  },
  { sequelize, modelName: "Brand" }
);

export default Brand;
