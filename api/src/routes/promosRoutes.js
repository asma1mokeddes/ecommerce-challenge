import Promo from "../models/promo.model.js";
import PromoMongo from "../models/promo.js";

export const getPromos = async (req, res) => {
    try {
        const promosMongo = await PromoMongo.find();
        res.json(promosMongo);
    } catch (err) {
        res.status(500).json({
            message:
                err.message ||
                "Une erreur est survenue lors de la récupération des promotions.",
        });
    }
};

export const getPromo = async (req, res) => {
    const promoId = req.params.promoId;

    await PromoMongo.findOne({ promoId: promoId })
        .then((data) => {
            if (data) {
                const promo = {
                    promoId: data.promoId,
                    promoCode: data.promoCode,
                    expirationDate: data.expirationDate,
                };
                res.send(promo);
            } else {
                res.status(404).send({
                    message: `La promotion avec l'id=${promoId} n'existe pas.`,
                });
            }
        })
        .catch((error) => {
            res.status(500).send({
                message: `Une erreur est survenue lors de la récupération de la promotion avec l'id=${promoId} : ${error}`,
            });
        });
};

export const createPromo = async (req, res) => {
    try {
        const { promoCode, expirationDate } = req.body;
        if (!promoCode || !expirationDate) {
            return res.status(400).json({
                message:
                    "Champs requis manquants. Veuillez fournir le code ainsi que la date d'expiration de la promotion.",
            });
        }

        let createdPromoPsql = await Promo.findOne({
            where: {
                promoCode: promoCode,
                expirationDate: expirationDate,
            },
        });

        let createdPromoMongo = await PromoMongo.findOne({
            promoCode,
            expirationDate,
        });

        if (!createdPromoMongo && !createdPromoPsql) {
            createdPromoMongo = await Promo.create({
                promoCode,
                expirationDate,
            });
            await PromoMongo.create({
                promoCode,
                expirationDate,
            });

            res.status(201).json({
                message: "Code promo créé avec succès",
                promoCode: createdPromoMongo.promoCode,
                expirationDate: createdPromoMongo.expirationDate,
            });
        } else {
            res.status(409).json({
                error: `Ce code promo existe déjà`,
            });
        }
    } catch (error) {
        res.status(500).json({
            error: `Une erreur est survenue lors de la création du code promo : ${error}`,
        });
    }
};

export const updatePromo = async (req, res) => {
    try {
        const promoId = req.params.promoId;
        const { promoCode, expirationDate } = req.body;

        // Vérifier si un code promo  existe
        const existingPromo = await Promo.findOne({
            where: {
                promoCode: promoCode,
            },
        });

        if (existingPromo) {
            return res.status(409).json({
                message: "Ce code promo existe déjà.",
            });
        }
        // Mise à jour dans PostgreSQL
        const [numPsql, updatedPromoPsql] = await Promo.update(
            { promoCode, expirationDate },
            { where: { id: promoId } }
        );

        // Mise à jour dans MongoDB
        const updatedPromoMongo = await PromoMongo.findOneAndUpdate(
            { promoId: promoId },
            { promoCode: promoCode, expirationDate: expirationDate },
            { new: true }
        );

        if (updatedPromoMongo && numPsql === 1) {
            const promo = {
                promoId: updatedPromoMongo.promoId,
                promoCode: updatedPromoMongo.promoCode,
                expirationDate: new Date(updatedPromoMongo.expirationDate),
            };

            return res.json({
                message: "Le code promo a bien été mise à jour.",
                promo,
            });
        } else {
            return res.status(404).json({
                message: `Le code promo avec l'ID ${promoId} n'existe pas.`,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: `Une erreur est survenue lors de la modification de ce code promo : ${error}`,
        });
    }
};

export const deletePromo = async (req, res) => {
    try {
        const promoId = req.params.promoId;

        const existingPromo = await Promo.findOne({
            where: {
                id: promoId,
            },
        });

        if (!existingPromo) {
            return res.status(409).json({
                message: "Ce code promo n'existe pas.",
            });
        }
        // Delete Promo in PostgreSQL
        const deletedPromoPsql = await Promo.destroy({
            where: { id: promoId },
        });

        // Delete category in MongoDB
        const deletedPromoMongo = await PromoMongo.findOneAndDelete({
            promoId: promoId,
        });

        if (deletedPromoPsql === 1 && deletedPromoMongo) {
            res.json({
                message: "Le code promo a bien été supprimé !",
            });
        } else {
            res.status(404).json({
                message: `Impossible de supprimer le code promo avec id=${promoId}.`,
            });
        }
    } catch (err) {
        res.status(500).json({
            message: `Erreur lors de la suppression de ce code promo`,
        });
    }
};
