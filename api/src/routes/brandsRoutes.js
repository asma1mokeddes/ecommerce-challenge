import Brand from "../models/brand.model.js";
import BrandMongo from "../models/brand.js";
import { Op } from "sequelize";

// Get all brands
export const getBrands = async (req, res) => {
    try {
        const brandsMongo = await BrandMongo.find();
        res.json(brandsMongo);
    } catch (err) {
        res.status(500).json({
            message:
                "Une erreur est survenue lors de la récupération des marques.",
        });
    }
};

// Get a brand by ID
export const getBrand = (req, res) => {
    const brandId = req.params.brandId;

    BrandMongo.findOne({ brandId: brandId })
        .then((data) => {
            if (data) {
                const brand = {
                    brandId: data.brandId,
                    brandName: data.brandName,
                };
                res.send(brand);
            } else {
                res.status(404).send({
                    message: `La marque avec l'id=${brandId} n'existe pas.`,
                });
            }
        })
        .catch((error) => {
            res.status(500).send({
                message: `Une erreur est survenue lors de la récupération de la marque avec l'id=${brandId} : ${error}`,
            });
        });
};

// Create a new brand

export const createBrand = async (req, res) => {
    try {
        const { brandName } = req.body;
        if (!brandName) {
            return res.status(400).json({
                message:
                    "Champs requis manquants. Veuillez fournir le nom de la marque.",
            });
        }

        let createdMarquePsql = await Brand.findOne({
            where: {
                brandName: brandName,
            },
        });

        let createdMarqueMongo = await BrandMongo.findOne({
            brandName,
        });

        if (!createdMarqueMongo && !createdMarquePsql) {
            await Brand.create({
                brandName,
            });
            createdMarqueMongo = await BrandMongo.create({
                brandName,
            });
        } else {
            return res.status(409).json({
                error: `Cette marque existe déjà`,
            });
        }

        return res.status(201).json({
            message: "Marque créé avec succès",
            createdMarqueMongo,
        });
    } catch (error) {
        return res.status(500).json({
            error: `Une erreur est survenue lors de la création de la marque : ${error}`,
        });
    }
};

// Update a brand by ID
export const updateBrand = async (req, res) => {
    try {
        const brandId = req.params.brandId;
        const { brandName } = req.body;

        // Vérifier si une marque ayant le nom brandName existe

        const existingBrand = await Brand.findOne({
            where: {
                brandName: brandName,
            },
        });

        if (existingBrand) {
            return res.status(409).json({
                message: `Une marque ayant ce nom ${brandName} existe déjà.`,
            });
        }

        // Mise à jour dans PostgreSQL
        const [numPsql, updatedMarquePsql] = await Brand.update(
            { brandName },
            { where: { id: brandId } }
        );

        // Mise à jour dans MongoDB
        const updatedBrandMongo = await BrandMongo.findOneAndUpdate(
            { brandId: brandId },
            { brandName },
            { new: true }
        );

        if (updatedBrandMongo && numPsql === 1) {
            const brand = {
                brandId: updatedBrandMongo.brandId,
                brandName: updatedBrandMongo.brandName,
            };

            return res.json({
                message: "La marque a bien été mise à jour.",
                brand,
            });
        } else {
            return res.status(404).json({
                message: `La marque avec l'ID ${brandId} n'existe pas.`,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: `Une erreur est survenue lors de la modification de la marque : ${error}`,
        });
    }
};

// Delete a brand by ID
export const deleteBrand = async (req, res) => {
    try {
        const brandId = req.params.brandId;

        const existingBrand = await Brand.findOne({
            where: {
                id: brandId,
            },
        });

        if (!existingBrand) {
            return res.status(409).json({
                message: "Cette marque n'existe pas.",
            });
        }
        // Delete category in PostgreSQL
        const deletedBrandPsql = await Brand.destroy({
            where: { id: brandId },
        });

        // Delete category in MongoDB
        const deletedBrandMongo = await BrandMongo.findOneAndDelete({
            brandId: brandId,
        });

        if (deletedBrandPsql === 1 && deletedBrandMongo) {
            res.json({
                message: "La marque a bien été supprimée!",
            });
        } else {
            res.status(404).json({
                message: `Impossible de supprimer la marque avec id=${brandId}.`,
            });
        }
    } catch (err) {
        res.status(500).json({
            message: `Erreur lors de la suppression de la marque`,
        });
    }
};
