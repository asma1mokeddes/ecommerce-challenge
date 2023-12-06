import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.config.js";

class OrderProduct extends Model {}

OrderProduct.init({
	price: {
	  type: DataTypes.INTEGER,
	  allowNull: false,
	},
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
}, {
	sequelize,
	timestamps: false,
	modelName: "OrderProduct",
});

export default OrderProduct;
