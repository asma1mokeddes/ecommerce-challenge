import { DataTypes, Model } from "sequelize";
import sequelize from "../config/config.js";

class User extends Model {}

User.init(
  {
    userID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    dateCreated: DataTypes.DATE,
    lastPasswordChangeDate: DataTypes.DATE,
    userRole: DataTypes.ENUM("ROLE_USER", "ROLE_STORE_KEEPER", "ROLE_ADMIN"),
    accountStatus: DataTypes.STRING,
    // Add other relevant fields
  },
  { sequelize, modelName: "User" }
);

export default User;
