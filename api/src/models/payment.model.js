import { DataTypes, Model } from "sequelize";
import sequelize from "../config/config.js";

class Payment extends Model {}

Payment.init(
  {
    paymentID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type: DataTypes.STRING, // e.g., 'Stripe', 'PayPal'
    amount: DataTypes.DECIMAL,
    dateProcessed: DataTypes.DATE,
    orderID: DataTypes.INTEGER,
    // Additional fields as necessary
  },
  { sequelize, modelName: "Payment" }
);

export default Payment;
