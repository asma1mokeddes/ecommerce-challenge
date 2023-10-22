import Category from "../models/category.model.js";

export const createCategory = async (req, res) => {
    try {
        // Validate request
        const { categoryName } = req.body;
        if (!categoryName) {
            return res.status(400).json({
                message: "Champs requis manquants. Veuillez fournir categoryName."
            });
        }

        // Vérifiez si la category existe déjà
        const existingCategory = await Category.findOne({
          where: {
            categoryName: categoryName
          }
        });
        if (existingCategory) {
            return res.status(409).json({
                message: `La catégorie ${categoryName} est déjà utilisée.`
            });
        }

        // Créer un utilisateur
        const category = new Category({
            categoryName
        });

        await category.save();

        res.status(201).json({
            message: "Category créé avec succès",
        });
    } catch (error) {
        res.status(500).json({
            error: `Une erreur est survenue lors de la création de la category : ${error}`,
        });
    }
};


  export const getCategories = (req, res) => {
  
    Category.findAll().then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving categories."
        });
      });
  };

  export const getCategory = (req, res) => {
    const id = req.params.id;
  
    Category.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Category with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Category with id=" + id
        });
      });
  };

  export const updateCategory = (req, res) => {
    const id = req.params.id;
  
    Category.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Category was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Category with id=${id}. Maybe Category was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Category with id=" + id
        });
      });
  };

  export const deleteCategory = (req, res) => {
    const id = req.params.id;
  
    Category.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Category was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Category with id=${id}. Maybe Category was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Category with id=" + id
        });
      });
  };