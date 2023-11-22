import { BOOLEAN, DataTypes, Model } from "sequelize";
import sequelize from "../config/config.js";

class Product extends Model {}

Product.init(
  {
    productID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        required: false,
    },
    price: {
        type: DataTypes.DECIMAL,
        required: false,
    },
    stockQuantity: {
        type: DataTypes.INTEGER,
        required: false,
    },
    categoryID: DataTypes.INTEGER,
    brandID: DataTypes.INTEGER,
    isPromotion: {
        type: BOOLEAN,
        required: false,
    },
    // Add other relevant fields
  },
  { sequelize, modelName: "Product" }
);

export default Product;
