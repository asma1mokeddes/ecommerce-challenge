import { DataTypes, Model } from "sequelize";
import Sequelize from "sequelize";
import sequelize from '../config/db.config.js';

class Category extends Model {}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,			
      primaryKey: true,
    },
    categoryName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: 'Category',
  }
);

export default Category;
