import CategoryMongo from "../models/category.js";
import BrandMongo from "../models/brand.js";
import ProductMongo from "../models/product.js";
import PromoMongo from "../models/promo.js";

import Product from "../models/product.model.js";
import Category from "../models/category.model.js";
import Brand from "../models/brand.model.js";
import Promo from "../models/promo.model.js";

export const getProduits = (req, res) => {
    Product.findAll()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Une erreur s'est produite lors de la récupération des produits.",
            });
        });
};

export const getProduit = (req, res) => {
    const id = req.params.id;

    Product.findByPk(id)
        .then((product) => {
            if (product) {
                res.send(product);
            } else {
                res.status(404).send({
                    message: `Impossible de trouver le produit avec l'ID ${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: `Erreur lors de la récupération du produit avec l'ID ${id}.`,
            });
        });
};

export const createProduit = async (req, res) => {
    const { productName, description, price, variants } = req.body;

    if (!productName || !description || !price || !variants) {
        return res.status(400).json({
            message:
                "Champs requis manquants. Veuillez fournir le nom du produit et sa description",
        });
    }

    try {
        const { category, brand, promo } = variants;

        // Vérification que la catégorie n'existe pas dans psql
        let createdCategoryPsql = await Category.findOne({
            where: { categoryName: category.categoryName },
        });

        if (!createdCategoryPsql) {
            await Category.create({
                categoryName: category.categoryName,
            });
        }

        // Vérification que la marque n'existe pas dans psql
        let createdBrandPsql = await Brand.findOne({
            where: { brandName: brand.brandName },
        });

        if (!createdBrandPsql) {
            await Brand.create({
                brandName: brand.brandName,
            });
        } else {
            res.status(500).json({
                error: `Cette marque existe déjà`,
            });
        }

        // Vérification que la promo n'existe pas
        let createdPromoPsql = await Promo.findOne({
            where: {
                promoCode: promo.promoCode,
                expirationDate: promo.expirationDate,
            },
        });

        if (!createdPromoPsql) {
            await Promo.create({
                promoCode: promo.promoCode,
                expirationDate: promo.expirationDate,
            });
        } else {
            res.status(500).json({
                error: `Ce code promo existe déjà`,
            });
        }

        // Vérification que la produit n'existe pas
        let createdProduitPsql = await Product.findOne({
            where: {
                productName,
                description,
                price,
            },
        });

        if (!createdProduitPsql) {
            createdProduitPsql = await Product.create({
                productName,
                description,
                price,
            });
        } else {
            res.status(500).json({
                error: `Ce produit existe déjà`,
            });
        }

        // Vérification que la catégorie n'existe pas en MongoDB
        let createdCategory = await CategoryMongo.findOne({
            categoryName: category.categoryName,
        });

        if (!createdCategory) {
            createdCategory = await CategoryMongo.create(category);
        } else {
            res.status(500).json({
                error: `Cette catégorie existe déjà`,
            });
        }

        // Vérification que la marque n'existe pas en MongoDB
        let createdBrand = await BrandMongo.findOne({
            brandName: brand.brandName,
        });

        if (!createdBrand) {
            createdBrand = await BrandMongo.create(brand);
        } else {
            res.status(500).json({
                error: `Cette marque existe déjà`,
            });
        }

        // Vérification que la promo n'existe pas en MongoDB
        let createdPromo = await PromoMongo.findOne({
            promoCode: promo.promoCode,
        });

        if (!createdPromo) {
            createdPromo = await PromoMongo.create(promo);
        } else {
            res.status(500).json({
                error: `Ce code promo existe déjà`,
            });
        }

        // Crée le produit dans la base de données MongoDB
        let createdProduitMongo = await ProductMongo.findOne({
            productName,
            description,
            price,
            category: createdCategory._id,
            brand: createdBrand._id,
            promo: createdPromo._id,
        });

        if (!createdProduitMongo) {
            createdProduitMongo = await ProductMongo.create({
                productName,
                description,
                price,
                category: createdCategory._id,
                brand: createdBrand._id,
                promo: createdPromo._id,
            });
        }

        res.status(201).json({
            message: "Produit créé avec succès",
            createdProduitPsql,
            createdProduitMongo,
        });
    } catch (error) {
        res.status(500).json({
            error: `Une erreur est survenue lors de la création du produit : ${error}`,
        });
    }
};

export const updateProduit = (req, res) => {
    const id = req.params.id;

    Product.update(req.body, {
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Produit was updated successfully.",
                });
            } else {
                res.send({
                    message: `Cannot update Produit with id=${id}. Maybe Produit was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating Produit with id=" + id,
            });
        });
};

export const deleteProduit = (req, res) => {
    const id = req.params.id;

    Product.destroy({
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Produit supprimée avec succès.",
                });
            } else {
                res.status(404).send({
                    message: `Impossible de supprimer la produit avec l'ID ${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: `Impossible de supprimer la produit avec l'ID ${id}.`,
            });
        });
};
