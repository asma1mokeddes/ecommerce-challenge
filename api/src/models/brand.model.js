import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.config.js";

class Brand extends Model {}

Brand.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        brandName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        timestamps: false,
        modelName: "Brand",
    }
);

export default Brand;
