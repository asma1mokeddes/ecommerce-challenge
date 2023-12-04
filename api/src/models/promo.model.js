import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.config.js";

class Promo extends Model {}

Promo.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        promoCode: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        expirationDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        sequelize,
        timestamps: false,
        modelName: "Promo",
    }
);

export default Promo;
