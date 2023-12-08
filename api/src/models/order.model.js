import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.config.js";

class Order extends Model {}

Order.init(
	{
	  orderId: {
			type: DataTypes.INTEGER,
            autoIncrement: true,
			primaryKey: true,
		},
		addressUser: {
			type: DataTypes.STRING,
			allowNull: false,
			},
    tel:{
      type: DataTypes.STRING,
      allowNull: true,
    },
      orderStatus: { 
        type: DataTypes.ENUM(
          "en attente de paiement",
          "paiement échoué",
          "payé",
          "en cours d'expédition",
          "expédié",
          "livré"
        ),
        allowNull: false,
      },
		},
	{
		sequelize, 
		timestamps: true,
		modelName: "Order",  
	}
);


import User from "./user.model.js";
import OrdersProducts from "./order-product.js"; 
import Product from "./product.model.js";

Order.belongsTo(User, {
	as: "user",
});

Order.belongsToMany(Product, {
	as: "products",
	through: OrdersProducts, 
});

Product.belongsToMany(Order, {
	as: "orders",
	through: OrdersProducts,
});

export default Order;  
