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
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getProduct = (req, res) => {
    const productId = req.params.productId;

    if (isNaN(Number(productId))) {
        return res.status(400).json({
            success: false,
            message: "L'ID du produit doit être un nombre."
        });
    }
        
    ProductMongo.findOne({ productId: productId })
        .then((data) => {
            if (data) {
                const product = {
                    productId: data.productId,
                    productName: data.productName,
                    description: data.description,
                    price: data.price,
                    image: data.image,
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
                success: false,
                message: error.message,
            });
        });
};

export const searchProducts = async (req, res) => {
    try {
        const searchTerm = req.query.q;
        const searchResultMongo = await ProductMongo.find({
            $or: [
                { productName: { $regex: searchTerm, $options: 'i' } },
                { description: { $regex: searchTerm, $options: 'i' } },
            ]
        })
        .catch(error => {
            console.error(error);
        });
        
        res.status(200).json({
            message: "Results Found",
            searchResultMongo,
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


export const createProduct = async (req, res) => {
    try {
        const { productName, description, price, image, variants } = req.body;

        if (!productName || !description || !price || !variants) {
            return res.status(400).json({
                message:
                    "Champs requis manquants. Veuillez fournir le nom du produit, sa description, son prix et ses variantes.",
            });
        }

        const { category, brand, promo } = variants;

        let categoryPsql = await Category.findOne({
            where: { categoryName: category },
        });

        let brandPsql = await Brand.findOne({
            where: { brandName: brand },
        });

        // Recherche de la catégorie dans MongoDB
        let categoryMongo = await CategoryMongo.findOne({
            categoryName: category,
        });

        // Recherche de la marque dans MongoDB
        let brandMongo = await BrandMongo.findOne({
            brandName: brand,
        });

        let promoPsql = null;
        let promoMongo = null;

        if (promo) {
            promoPsql = await Promo.findOne({
                where: {
                    promoCode: promo,
                },
            });

            promoMongo = await PromoMongo.findOne({
                promoCode: promo,
            });
        } 

        // Vérification que le produit n'existe pas dans PostgreSQL
        let createdProductPsql = await Product.findOne({
            where: {
                productName,
                description,
                price,
            },
        });

        // Vérification que le produit n'existe pas dans MongoDB
        let createdProductMongo = await ProductMongo.findOne({
            productName,
            description,
            price,
            category: categoryMongo,
            brand: brandMongo,
            promo: promoMongo,
        });


        if (!createdProductPsql && !createdProductMongo) {
            // Création du produit dans  Psql
            createdProductPsql = await Product.create({
                productName,
                description,
                price,
                image,
                CategoryId: categoryPsql.id,
                BrandId: brandPsql.id,
                PromoId: promoPsql ? promoPsql.id : null,
            });

            // Création du produit dans Mongo
            createdProductMongo = await ProductMongo.create({
                productName,
                description,
                price,
                image,
                category: categoryMongo.id,
                brand: brandMongo.id,
                promo: promoMongo ? promoMongo.id : null,
            });

            console.log("createdProductPsql===", createdProductPsql);
            console.log("createdProductMongo===", createdProductMongo);
        } else {
            return res.status(409).json({
                error: "Ce produit existe déjà.",
            });
        }

        res.status(201).json({
            message: "Produit créé avec succès",
            createdProductPsql,
            // createdProductMongo,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
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
        .catch((error) => {
            res.status(500).send({
                success: false,
                message: error.message,
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
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export default {
    getProducts,
    getProduct,
    searchProducts,
    createProduct,
    updateProduct,
    deleteProduct
};