import CategoryMongo from "../models/category.js";
import BrandMongo from "../models/brand.js";
import ProductMongo from "../models/product.js";
import PromoMongo from "../models/promo.js";
import mongoose from 'mongoose';
import Product from "../models/product.model.js";
import Category from "../models/category.model.js";
import Brand from "../models/brand.model.js";
import Promo from "../models/promo.model.js";

export const getProducts = async (req, res) => {
    try {
        const productsMongo = await ProductMongo.find();
        console.log(productsMongo, "dlshfds");
        res.json(productsMongo);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


export const getProduct = async (req, res) => {
    const productId = req.params.productId;
    if (isNaN(Number(productId))) {
        return res.status(400).json({ success: false, message: "L'ID du produit doit être un nombre." });
    }

    try {
        const product = await ProductMongo.findOne({ productId: productId });
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: `Le produit avec l'id=${productId} n'existe pas.` });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


export const searchProducts = async (req, res) => {
    try {
        const { q, minPrice, maxPrice } = req.query;
        let searchQuery = {};

        if (q) {
            // Préparer une liste de conditions de recherche
            let orConditions = [
                { productName: { $regex: q, $options: 'i' } },
                { description: { $regex: q, $options: 'i' } }
            ];

            // Vérifier si q est un ObjectId valide
            if (mongoose.Types.ObjectId.isValid(q)) {
                orConditions.push(
                    { category: q },
                    { brand: q },
                    { promo: q }
                );
            }

            searchQuery.$or = orConditions;
        }

        // Filtre par prix minimum
        if (minPrice) {
            const minPriceValue = parseFloat(minPrice);
            if (!isNaN(minPriceValue)) {
                searchQuery.price = { ...searchQuery.price, $gte: minPriceValue };
            }
        }

        // Filtre par prix maximum
        if (maxPrice) {
            const maxPriceValue = parseFloat(maxPrice);
            if (!isNaN(maxPriceValue)) {
                searchQuery.price = { ...searchQuery.price, $lte: maxPriceValue };
            }
        }

        const searchResults = await ProductMongo.find(searchQuery).populate('category').populate('brand').populate('promo');
        res.status(200).json(searchResults);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};




export const createProduct = async (req, res) => {
    const { productName, description, price, image, variants } = req.body;

    if (!productName || !description || !price || !variants) {
        return res.status(400).json({ message: "Champs requis manquants. Veuillez fournir le nom du produit, sa description, son prix et ses variantes." });
    }

    const { category, brand, promo } = variants;

    try {
        const categoryMongo = await CategoryMongo.findOne({ categoryName: category });
        const brandMongo = await BrandMongo.findOne({ brandName: brand });
        let promoMongo = promo ? await PromoMongo.findOne({ promoCode: promo }) : null;

        const existingProduct = await ProductMongo.findOne({ productName, description, price, category: categoryMongo, brand: brandMongo, promo: promoMongo });

        if (existingProduct) {
            return res.status(409).json({ error: "Ce produit existe déjà." });
        }

        const newProduct = await ProductMongo.create({ productName, description, price, image, category: categoryMongo, brand: brandMongo, promo: promoMongo });
        res.status(201).json({ message: "Produit créé avec succès", newProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateProduct = async (req, res) => {
    const id = req.params.id;

    try {
        const updateResult = await Product.update(req.body, { where: { id: id } });
        if (updateResult == 1) {
            res.json({ message: "Produit mis à jour avec succès." });
        } else {
            res.status(404).json({ message: `Impossible de mettre à jour le produit avec id=${id}. Peut-être que le produit n'a pas été trouvé ou le corps de la requête est vide !` });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    const productId = req.params.productId;

    try {
        const existingProduct = await Product.findOne({ where: { id: productId } });

        if (!existingProduct) {
            return res.status(404).json({ message: "Ce produit n'existe pas." });
        }

        await Product.destroy({ where: { id: productId } });
        await ProductMongo.findOneAndDelete({ productId: productId });

        res.json({ message: "Le produit a bien été supprimé !" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
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

