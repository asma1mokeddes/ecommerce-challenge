import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.config.js";

class Product extends Model {}

Product.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        productName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        newProduct: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    },
    {
        sequelize,
        timestamps: true,
        modelName: "Product",
    }
);

let Category;
let Brand;
let Promo;
import("./category.model.js")
    .then((module) => {
        Category = module.default;

        Product.belongsTo(Category);
    })
    .catch((error) => {
        console.error(
            "Erreur lors de l'importation du modèle Category :",
            error
        );
    });

import("./brand.model.js")
    .then((module) => {
        Brand = module.default;

        Product.belongsTo(Brand);
    })
    .catch((error) => {
        console.error("Erreur lors de l'importation du modèle Brand :", error);
    });

import("./promo.model.js")
    .then((module) => {
        Promo = module.default;

        Product.belongsTo(Promo);
    })
    .catch((error) => {
        console.error("Erreur lors de l'importation du modèle Promo :", error);
    });

export default Product;
