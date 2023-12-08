import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.config.js";

class Payment extends Model {}

Payment.init(
	{
		paymentId: {
			type: DataTypes.UUID,
			primaryKey: true,
			allowNull: false,
			defaultValue: DataTypes.UUIDV4,
		},
		status: {
			type: DataTypes.ENUM("succès", "échec","non payé"),
			allowNull: false,
		},
		idStripe: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		sequelize,
		timestamps: true,
		modelName: "Payment",
	}
);

import Order from "./order.model.js";

Order.hasOne(Payment, {
	foreignKey: "orderId",
	as: "payment",
});




export default Payment;
