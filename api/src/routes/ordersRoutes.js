import Order from "../models/order.model";

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "username"],
        },
        {
          model: Product,
          attributes: ["id", "productName"],
          through: { attributes: [] }, // Pour exclure les attributs de la table de liaison
        },
      ],
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({
      message: "Une erreur est survenue lors de la récupération des commandes.",
    });
  }
};

export const getOrder = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const order = await Order.findByPk(orderId, {
      include: [
        {
          model: User,
          attributes: ["id", "username"],
        },
        {
          model: Product,
          attributes: ["id", "productName"],
          through: { attributes: [] }, // Pour exclure les attributs de la table de liaison
        },
      ],
    });

    if (order) {
      res.json(order);
    } else {
      res.status(404).json({
        message: `La commande avec l'id=${orderId} n'existe pas.`,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `Une erreur est survenue lors de la récupération de la commande avec l'id=${orderId} : ${error}`,
    });
  }
};

export const createOrder = async (req, res) => {
  try {
    const { userId, products, totalAmount } = req.body;

    const createdOrder = await Order.create({
      userId,
      products,
      totalAmount,
    });

    res.status(201).json({
      message: "Commande créée avec succès",
      order: createdOrder,
    });
  } catch (error) {
    res.status(500).json({
      message: `Une erreur est survenue lors de la création de la commande : ${error}`,
    });
  }
};

export const updateOrder = async (req, res) => {
  const orderId = req.params.orderId;
  const { userId, products, totalAmount } = req.body;

  try {
    const [num, updatedOrder] = await Order.update(
      {
        userId,
        products,
        totalAmount,
      },
      { where: { id: orderId }, returning: true }
    );

    if (num > 0) {
      res.json({
        message: "La commande a bien été mise à jour.",
        order: updatedOrder[0],
      });
    } else {
      res.status(404).json({
        message: `La commande avec l'ID ${orderId} n'existe pas.`,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `Une erreur est survenue lors de la modification de la commande : ${error}`,
    });
  }
};

export const deleteOrder = async (req, res) => {
  const orderId = req.params.orderId;

  try {
    const deletedOrder = await Order.destroy({
      where: { id: orderId },
    });

    if (deletedOrder > 0) {
      res.json({
        message: "La commande a bien été supprimée!",
      });
    } else {
      res.status(404).json({
        message: `Impossible de supprimer la commande avec id=${orderId}.`,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `Erreur lors de la suppression de la commande : ${error}`,
    });
  }
};
