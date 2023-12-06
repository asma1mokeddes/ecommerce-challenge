import Category from "../models/category.model.js";
import CategoryMongo from "../models/category.js";

export const getCategories = async (req, res) => {
    try {
        const categoriesMongo = await CategoryMongo.find();
        res.json(categoriesMongo);
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

export const getCategory = (req, res) => {
    const categoryId = req.params.categoryId;

    CategoryMongo.findOne({ categoryId: categoryId })
        .then((data) => {
            if (data) {
                const category = {
                    categoryId: data.categoryId,
                    categoryName: data.categoryName,
                };
                res.send(category);
            } else {
                res.status(404).send({
                    message: `La catégorie avec l'id=${categoryId} n'existe pas.`,
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

export const createCategory = async (req, res) => {
    try {
        const { categoryName } = req.body;
        if (!categoryName) {
            return res.status(400).json({
                message:
                    "Champs requis manquants. Veuillez fournir le nom de la catégorie.",
            });
        }

        let createdCategoryPsql = await Category.findOne({
            where: {
                categoryName: categoryName,
            },
        });

        let createdCategoryMongo = await CategoryMongo.findOne({
            categoryName,
        });

        if (!createdCategoryMongo && !createdCategoryPsql) {
            createdCategoryPsql = await Category.create({
                categoryName,
            });
            createdCategoryMongo = await CategoryMongo.create({
                categoryId: createdCategoryPsql.id,
                categoryName,
            });
        } else {
            res.status(409).json({
                error: `Cette catégorie existe déjà`,
            });
        }

        res.status(201).json({
            success: true,
            message: "Catégorie créé avec succès",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const updateCategory = async (req, res) => {
    try {
        const categoryId = req.params.categoryId;
        const { categoryName } = req.body;

        // Vérifier si une catégorie avec le même nom existe déjà
        const existingCategory = await Category.findOne({
            where: {
                categoryName: categoryName, // Exclure la catégorie actuelle de la recherche
            },
        });

        if (existingCategory) {
            return res.status(409).json({
                message: `La catégorie ayant pour nom ${categoryName} existe déjà.`,
            });
        }

        // Mise à jour dans PostgreSQL
        const [numPsql, updatedCategoryPsql] = await Category.update(
            { categoryName },
            { where: { id: categoryId } }
        );

        // Mise à jour dans MongoDB
        const updatedCategoryMongo = await CategoryMongo.findOneAndUpdate(
            { categoryId: categoryId },
            { categoryName },
            { new: true }
        );

        if (updatedCategoryMongo && numPsql === 1) {
            const category = {
                categoryId: updatedCategoryMongo.categoryId,
                categoryName: updatedCategoryMongo.categoryName,
            };

            return res.json({
                success: true,
                message: "La catégorie a bien été mise à jour.",
                category,
            });
        } else {
            return res.status(404).json({
                message: `La catégorie avec l'ID ${categoryId} n'existe pas.`,
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.categoryId;

        const existingCategory = await Category.findOne({
            where: {
                id: categoryId,
            },
        });

        if (!existingCategory) {
            return res.status(409).json({
                message: "Cette catégorie n'existe pas.",
            });
        }
        // Delete category in PostgreSQL
        const deletedCategoryPsql = await Category.destroy({
            where: { id: categoryId },
        });

        // Delete category in MongoDB
        const deletedCategoryMongo = await CategoryMongo.findOneAndDelete({
            categoryId: categoryId,
        });

        if (deletedCategoryPsql === 1 && deletedCategoryMongo) {
            res.json({
                message: "La catégorie a bien été supprimée!",
            });
        } else {
            res.status(404).json({
                message: `Impossible de supprimer la catégorie avec id=${categoryId}.`,
            });
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};
