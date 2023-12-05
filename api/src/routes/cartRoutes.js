import User from "../models/user.model.js";
import Product from "../models/product.model.js";
import { getUserIdFromToken } from "../utils/auth.js"; 

export const getCart = async (req, res) => {    
    try{
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: "Token manquant dans l'en-tête Authorization" });
        }

        const userId = getUserIdFromToken(token);

        const user = await User.findOne({ where: { id: userId } });

        if(!user){
            return res.status(404).json('Could not find user!');
        }
        const products = await Product.findAll();
        const cartItemIds = user.cartItems;
        const cartItems = cartItemIds.map(id => products.find(product => product.id === id));
        res.status(200).json(cartItems);
    }catch (error){
        console.error(error);
        res.status(500).json('Internal Server Error');    
    }
  };

export const addCart = async (req, res) => {
    const { productId } = req.body;
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: "Token manquant dans l'en-tête Authorization" });
        }

        const userId = getUserIdFromToken(token);
        console.log(userId);    

        await User.update(
            { cartItems: Sequelize.fn('array_append', Sequelize.col('cartItems'), productId) },
            { where: { id: 1 } }
          );
        const updatedUser = await User.findOne({ where: { id: userId } });
        const products = await Product.findAll();
        const cartItemIds = updatedUser.cartItems;
        const cardItems = cartItemIds.map(id => products.find(product => product.id === id));
        res.status(200).json(cardItems);
    } catch (error) {
        console.error(error);
        res.status(500).json('Internal Server Error');
    }
};

export const deleteCart = async (req, res) => {
    const { userId, productId } = req.params;

    try {
        await User.update(
            { cartItems: Sequelize.fn('array_remove', Sequelize.col('cartItems'), productId) },
            { where: { id: userId } }
          );
        const updatedUser = await User.findOne({ where: { id: userId } });
        const products = await Product.findAll();
        const cartItemIds = updatedUser.cartItems;
        const cartItems = cartItemIds.map(id => products.find(product => product.id === id));
        res.status(200).json(cartItems);
    } catch (error) {
        console.error(error);
        res.status(500).json('Internal Server Error');
    }
};