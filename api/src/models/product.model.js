import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.config.js";

class Product extends Model {}

Product.init(
  {
    productID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.DECIMAL,
    stockQuantity: DataTypes.INTEGER,
    categoryID: DataTypes.INTEGER,
    brandID: DataTypes.INTEGER,
    isPromotion: DataTypes.BOOLEAN,
    // Add other relevant fields
  },
  { sequelize, modelName: "Product" }
);

export default Product;
