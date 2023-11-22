import { DataTypes, Model } from "sequelize";
import sequelize from "../config/config.js";

class Category extends Model {}

Category.init(
  {
    categoryID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: DataTypes.TEXT,
  },
  { sequelize, modelName: "Category" }
);

export default Category;
