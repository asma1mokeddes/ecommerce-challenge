import Order from "../models/order.model.js";
import OrderProduct from "../models/order-product.js";
// import Product from "../models/product.js";
// import User from "../models/user.model.js";

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({ include: "products" });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: `Une erreur est survenue lors de la récupération des commandes : ${error.message}`,
    });
  }
};

export const createOrder = async (req, res) => {
    try {
        const { userId, products, deliveryAddress } = req.body;

        const createdOrder = await Order.create({
            addressUser: deliveryAddress,
            orderStatus: "en attente de paiement", 
            userId: userId,
        });

        for (const product of products) {
            await createdOrder.addProduct(product.id, {
                through: { 
                  price: product.price,
                  quantity: product.quantity,
                },
            });
        }
        res.status(201).json({ message: "Commande créée avec succès", orderId: createdOrder.orderId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur interne du serveur" });
    }
};

export const getOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findOne({
      where: { id: id },
      include: ["products","user"],
    });

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({
      message: `Une erreur est survenue lors de la récupération de la commande : ${error.message}`,
    });
  }
};

export const getOrdersUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.findAll({
      where: { userId: userId },
      include: ["user", "products"],
    });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: `Une erreur est survenue lors de la récupération des commandes : ${error.message}`,
    });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { orderStatus, deliveryAddress } = req.body;

    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.status(404).json({ message: "Commande non trouvée" });
    }

    await order.update({
      orderStatus: orderStatus || order.orderStatus, // Mettre à jour uniquement si défini dans le body
      addressUser: deliveryAddress || order.addressUser, // Mettre à jour uniquement si défini dans le body
    });

    res.status(200).json({ message: "Commande mise à jour avec succès" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.status(404).json({ message: "Commande non trouvée" });
    }

    await order.destroy();

    res.status(200).json({ message: "Commande supprimée avec succès" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

