// models/order.js

import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

class Order extends Model{}

Order.init(
{
    id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  products: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: false,
  },
  totalAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  orderDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
});

let User;
import("./user.model.js")
    .then((module) => {
        User = module.default;

        Order.belongsTo(User, { foreignKey: "userId" });
    })
    .catch((error) => {
        console.error("Erreur lors de l'importation du modèle User :", error);
    });

let Product;
import("./product.model.js")
    .then((module) => {
        Product = module.default;

        Order.belongsToMany(Product, {
            through: "OrderProducts", // Nom de la table de liaison
            foreignKey: "orderId",
            otherKey: "productId",
        });
    })
    .catch((error) => {
        console.error("Erreur lors de l'importation du modèle Product :", error);
    });

export default Order;
