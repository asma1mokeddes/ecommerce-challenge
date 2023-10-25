import Promo from '../models/promo.model.js';

export const getPromos = (req, res) => {
  Promo.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Une erreur s\'est produite lors de la récupération des promotions.'
      });
    });
};

export const createPromo = (req, res) => {
  const { promoCode, expirationDate } = req.body;

  if (!promoCode || !expirationDate) {
    return res.status(400).json({
      message: 'Champs requis manquants. Veuillez fournir le code promo et la date d\'expiration.'
    });
  }

  Promo.create({
    promoCode,
    expirationDate
  })
    .then(promo => {
      res.status(201).json({
        message: 'Promotion créée avec succès',
        promo
      });
    })
    .catch(error => {
      res.status(500).json({
        error: `Une erreur est survenue lors de la création de la promotion : ${error}`
      });
    });
};

export const getPromo = (req, res) => {
  const id = req.params.id;

  Promo.findByPk(id)
    .then(promo => {
      if (promo) {
        res.send(promo);
      } else {
        res.status(404).send({
          message: `Impossible de trouver la promotion avec l'ID ${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Erreur lors de la récupération de la promotion avec l'ID ${id}.`
      });
    });
};

export const updatePromo = (req, res) => {
  const id = req.params.id;
  const { promoCode, expirationDate } = req.body;

  if (!promoCode || !expirationDate) {
    return res.status(400).json({
      message: 'Champs requis manquants. Veuillez fournir le code promo et la date d\'expiration.'
    });
  }

  Promo.update(
    { promoCode, expirationDate },
    { where: { id: id } }
  )
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Promotion mise à jour avec succès.'
        });
      } else {
        res.status(404).send({
          message: `Impossible de mettre à jour la promotion avec l'ID ${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Erreur lors de la mise à jour de la promotion avec l'ID ${id}.`
      });
    });
};

export const deletePromo = (req, res) => {
  const id = req.params.id;

  Promo.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Promotion supprimée avec succès.'
        });
      } else {
        res.status(404).send({
          message: `Impossible de supprimer la promotion avec l'ID ${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Impossible de supprimer la promotion avec l'ID ${id}.`
      });
    });
};
