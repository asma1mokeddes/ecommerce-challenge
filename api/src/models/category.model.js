import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.config.js";

class Category extends Model {}

Category.init(
  {
    categoryID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
  },
  { sequelize, modelName: "Category" }
);

export default Category;
