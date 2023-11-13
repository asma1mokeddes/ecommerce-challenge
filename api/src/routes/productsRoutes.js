import CategoryMongo from "../models/category.js";
import BrandMongo from "../models/brand.js";
import ProductMongo from "../models/product.js";
import PromoMongo from "../models/promo.js";

import Product from "../models/product.model.js";
import Category from "../models/category.model.js";
import Brand from "../models/brand.model.js";
import Promo from "../models/promo.model.js";

export const getProducts = async (req, res) => {
    try {
        const productsMongo = await ProductMongo.find();
        res.json(productsMongo);
    } catch (err) {
        res.status(500).json({
            message:
                err.message ||
                "Une erreur est survenue lors de la récupération des produits.",
        });
    }
};

export const getProduct = (req, res) => {
    const productId = req.params.productId;

    ProductMongo.findOne({ productId: productId })
        .then((data) => {
            if (data) {
                const product = {
                    productId: data.productId,
                    productName: data.productName,
                    description: data.description,
                    price: data.price,
                    category: data.category,
                    brand: data.brand,
                    promo: data.promo,
                };
                res.send(product);
            } else {
                res.status(404).send({
                    message: `Le produit avec l'id=${productId} n'existe pas.`,
                });
            }
        })
        .catch((error) => {
            res.status(500).send({
                message: `Une erreur est survenue lors de la récupération du produit avec l'id=${categoryId} : ${error}`,
            });
        });
};

export const createProduct = async (req, res) => {
    try {
        const { productName, description, price, variants } = req.body;

        if (!productName || !description || !price || !variants) {
            return res.status(400).json({
                message:
                    "Champs requis manquants. Veuillez fournir le nom du produit, sa description, son prix et ses variantes.",
            });
        }

        const { category, brand, promo } = variants;
        let categoryPsql = await Category.findOne({
            where: { categoryName: category.categoryName },
        });

        let brandPsql = await Brand.findOne({
            where: { brandName: brand.brandName },
        });

        let promoPsql = await Promo.findOne({
            where: {
                promoCode: promo.promoCode,
                expirationDate: new Date(promo.expirationDate),
            },
        });

        // Vérification que le produit n'existe pas dans PostgreSQL
        let createdProductPsql = await Product.findOne({
            where: {
                productName,
                description,
                price,
            },
        });

        if (!createdProductPsql) {
            createdProductPsql = await Product.create({
                productName,
                description,
                price,
                CategoryId: categoryPsql.id,
                BrandId: brandPsql.id,
                PromoId: promoPsql.id,
            });
        } else {
            return res.status(409).json({
                error: "Ce produit existe déjà dans PostgreSQL.",
            });
        }

        let createdProductMongo = await ProductMongo.findOne({
            productName,
            description,
            price,
            category: categoryPsql,
            brand: brandPsql,
            promo: promoPsql,
        });

        if (!createdProductMongo) {
            createdProductMongo = await ProductMongo.create({
                productName,
                description,
                price,
                category: categoryPsql,
                brand: brandPsql,
                promo: promoPsql,
            });
        } else {
            return res.status(409).json({
                error: "Ce produit existe déjà dans MongoDB.",
            });
        }

        res.status(201).json({
            message: "Produit créé avec succès",
            createdProductPsql,
            createdProductMongo,
        });
    } catch (error) {
        res.status(500).json({
            error: `Une erreur est survenue lors de la création du produit : ${error}`,
        });
    }
};

export const updateProduct = (req, res) => {
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

export const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.productId;

        const existingProduct = await Product.findOne({
            where: {
                id: productId,
            },
        });

        if (!existingProduct) {
            return res.status(409).json({
                message: "Ce produit n'existe pas.",
            });
        }
        // Delete product in PostgreSQL
        const deletedProductPsql = await Product.destroy({
            where: { id: productId },
        });

        // Delete product in MongoDB
        const deletedProductMongo = await ProductMongo.findOneAndDelete({
            productId: productId,
        });

        if (deletedProductPsql === 1 && deletedProductMongo) {
            res.json({
                message: "Le produit a bien été supprimé !",
            });
        } else {
            res.status(404).json({
                message: `Impossible de supprimer le produit avec id=${categoryId}.`,
            });
        }
    } catch (err) {
        res.status(500).json({
            message: `Erreur lors de la suppression du produit`,
        });
    }
};
