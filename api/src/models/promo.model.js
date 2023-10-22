import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.config.js';

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
    modelName: 'Promo',
  }
);

let Product;
import("./product.model.js")
    .then((module) => {
        Product = module.default;

        // Définir l'association avec Product
        Promo.hasMany(Product, { foreignKey: 'promoId' });    })
    .catch((error) => {
        console.error("Erreur lors de l'importation du modèle Promo :", error);
    });

export default Promo;
