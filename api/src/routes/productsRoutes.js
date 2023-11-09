import Product from "../models/product.model.js";

export const getProduits = (req, res) => {
    Promo.findAll()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Une erreur s'est produite lors de la récupération des promotions.",
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

export const createProduit = (req, res) => {
    const { productName, description, price } = req.body;

    if (!productName || !description || !price) {
        return res.status(400).json({
            message:
                "Champs requis manquants. Veuillez fournir le code produit et la date d'expiration.",
        });
    }

    Product.create({
        productName,
        description,
        price,
    })
        .then((product) => {
            res.status(201).json({
                message: "Produit créée avec succès",
                product,
            });
        })
        .catch((error) => {
            res.status(500).json({
                error: `Une erreur est survenue lors de la création du produit : ${error}`,
            });
        });
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
