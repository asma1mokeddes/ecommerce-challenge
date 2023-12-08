import Payment from "../models/payment.model.js";
import Order from "../models/order.model.js";
import User from "../models/user.model.js";
import stripe from "../config/payment.config.js"; 

export const getPayments = async (req, res) => {
    try {
      const payments = await Payment.findAll();
      if (payments.length === 0) {
        res.status(404).json({ message: "Aucun paiement trouvé" });
      }
  
      return res.status(200).json(payments);
  } catch (error) {
      res.status(500).json({
          message: `An error occurred while getting the payments : ${error.message}`,
      });
  }
  };

  export const getPayment = async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ message: "Le paramètre id est manquant" });
      }
  
      const payment = await Payment.findOne({
        where: { paymentId: id },
        include: "order",
      });
      if (!payment) {
        return res.status(404).json({ message: "Paiement introuvable" });
      }
  
      return res.status(200).json(payment);
    } catch (error) {
      res.status(500).json({
        message: `Une erreur s'est produite lors de la récupération du paiement : ${error.message}`,
      });
    }
  };
  

export const createPayment = async (req, res) => {
  try {
    const { orderId } = req.body;

    const order = await Order.findOne({
      where: { orderId: orderId },
      include: "products",
    });

    const products = order.products;
    const user = await User.findOne({ where: { id: order.userId } });

    const storeItems = {};
    products.forEach((item) => {
      storeItems[item.id] = {
        productName: item.productName,
        quantity: item.OrderProduct.quantity,
        price: item.price,
      };
    });

    console.log("storeItems", storeItems);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: products.map((item) => {
        const storeItem = storeItems[item.id];
        return {
          price_data: {
            currency: "eur",
            product_data: {
              name: storeItem.productName,
            },
            unit_amount: parseInt(storeItem.price * 100),
          },
          quantity: storeItem.quantity,
        };
      }),
      success_url: "http://localhost:3002/payment/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:3002/payment/failed?session_id={CHECKOUT_SESSION_ID}",
      metadata: {
        adress: order.deliveryAddress,
        email: user.email,
        firstName: user.firstname,
        lastName: user.lastname,
      },
    });


    const payment = await Payment.create({
      orderId: order.orderId,
      idStripe: session.id,
      status: "non payé",
    });

    return res.status(201).json(payment);
  } catch (error) {
    return res.status(500).json({
        message: `Une erreur s'est produite lors de la création du paiement : ${error.message}`,
    });
  }
};

export const getStripeSession = async (req, res) => {
  try {
      if (!req.params.session) {
        return res.status(400).json({ message: "session parameter is missing" });
      }

      const payment = await Payment.findOne({
        where: { paymentId: req.params.session },
      });
      if (!payment) {
        return res.status(404).json({ message: "Payment not found" });
      }

      const session = await stripe.checkout.sessions.retrieve(
        payment.idStripe
      );
      
      if(!session)
        return res.status(404).json({ message: "Session not found" }
      );

      return res.status(200).json(session);
    } catch (error) {
      res.status(500).json({
        message: `An error occurred while getting the payment url : ${error.message}`,
      });
    }
  };


export const purchaseSuccess = async (req, res) => {
  try {
    const { session_id } = req.query;
    const payment = await Payment.findOne({
      where: { idStripe: session_id },
    });

    const session = await stripe.checkout.sessions.retrieve(
      payment.idStripe
    );
    if (session.payment_status === "paid") {
      payment.status = "succès";
      await payment.save();
      const order = await Order.findOne({ where: { orderId: payment.orderId } });
      order.status = "payé";
      await order.save();
      return res.json({ message: "Paiement réussi" });
    }
  } catch (error) {
    res.status(500).json({
      message: `Une erreur s'est produite lors de l'obtention de l'URL de paiement : ${error.message}`,
    });
  }
};

export const purchaseFailed = async (req, res) => {
  try {
    const { session_id } = req.query;
    const payment = await Payment.findOne({
      where: { idStripe: session_id },
    });
    payment.status = "échec";
    await payment.save();
    const order = await Order.findOne({ where: { orderId: payment.orderId } });
    order.status = "paiement échoué";
    await order.save();

    return res.json({ message: "Paiement échoué" });
  } catch (error) {
    res.status(500).json({
      message: `Une erreur s'est produite lors de l'obtention de l'URL de paiement : ${error.message}`,
    });
  }
};

