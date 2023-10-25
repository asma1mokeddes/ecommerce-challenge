import Brand from "../models/brand.model.js";

// Créer une marque
export const createBrand = async (req, res) => {
  try {
    // Valider la requête
    const { brandName } = req.body;
    if (!brandName) {
      return res.status(400).json({
        message: "Champs requis manquants. Veuillez fournir brandName."
      });
    }

    // Vérifiez si la marque existe déjà
    const existingBrand = await Brand.findOne({
      where: {
        brandName: brandName
      }
    });

    if (existingBrand) {
      return res.status(409).json({
        message: `La marque ${brandName} est déjà utilisée.`
      });
    }

    // Créer une nouvelle marque
    const brand = await Brand.create({
      brandName
    });

    res.status(201).json({
      message: "Marque créée avec succès",
      brand: brand
    });
  } catch (error) {
    res.status(500).json({
      error: `Une erreur est survenue lors de la création de la marque : ${error}`,
    });
  }
};

// Obtenir toutes les marques
export const getBrands = (req, res) => {
  Brand.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Une erreur s'est produite lors de la récupération des marques."
      });
    });
};

// Obtenir une marque par ID
export const getBrand = (req, res) => {
  const id = req.params.id;

  Brand.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Impossible de trouver la marque avec l'ID ${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erreur lors de la récupération de la marque avec l'ID " + id
      });
    });
};

// Mettre à jour une marque
export const updateBrand = (req, res) => {
  const id = req.params.id;

  Brand.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Marque mise à jour avec succès."
        });
      } else {
        res.send({
          message: `Impossible de mettre à jour la marque avec l'ID ${id}. Peut-être que la marque n'a pas été trouvée ou req.body est vide !`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erreur lors de la mise à jour de la marque avec l'ID " + id
      });
    });
};

// Supprimer une marque
export const deleteBrand = (req, res) => {
  const id = req.params.id;

  Brand.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Marque supprimée avec succès !"
        });
      } else {
        res.send({
          message: `Impossible de supprimer la marque avec l'ID ${id}. Peut-être que la marque n'a pas été trouvée !`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Impossible de supprimer la marque avec l'ID " + id
      });
    });
};
