import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.config.js";
import Sequelize from "sequelize";

class User extends Model {}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        emailAddress: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        passwordModificationDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        role: {
            type: DataTypes.ENUM(
                "ROLE_USER",
                "ROLE_STORE_KEEPER",
                "ROLE_ADMIN"
            ),
        },
        cartItems: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true,
            defaultValue: [],
        },
    },
    {
        sequelize,
        timestamps: true,
        modelName: "User",
    }
);

export default User;
