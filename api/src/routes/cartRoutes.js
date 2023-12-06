import User from "../models/user.model.js";
import Product from "../models/product.model.js";
import ProductMongo from "../models/product.js";
import { getUserIdFromToken } from "../utils/auth.js"; 
import Sequelize from 'sequelize';

export const getCart = async (req, res) => {     
    const userId = req.params.userId;
    try{
        const user = await User.findOne({ where: { id: userId } });

        if(!user){
            return res.status(404).json('Could not find user!');
        }
        const cartItemIds = user.cartItems;
        const cartItems = await ProductMongo.find({ productId: { $in: cartItemIds } });
        res.status(200).json(cartItems);
    }catch (error){
        console.error(error);
        res.status(500).json('Internal Server Error');    
    }
  };

export const addCart = async (req, res) => {
    const { productId } = req.body;
    const userId = req.params.userId;
    try {

        await User.update(
            { cartItems: Sequelize.literal(`"cartItems" || ARRAY[${productId}]::varchar[]`) },
            { where: { id: userId } }
          );
          
        const updatedUser = await User.findOne({ where: { id: userId } });
        const cartItemIds = updatedUser.cartItems;
        const products = await ProductMongo.find({ productId: { $in: cartItemIds } });
        const cartItems = cartItemIds.map(id => products.find(product => product.productId.toString() === id));
        
        res.status(200).json(cartItems);
    } catch (error) {
        console.error(error);
        res.status(500).json('Internal Server Error');
    }
};

export const deleteCart = async (req, res) => {
    const productId = req.params.productId;
    const userId = req.params.userId;

    try {
        await User.update(
            { cartItems: Sequelize.fn('array_remove', Sequelize.col('cartItems'), productId) },
            { where: { id: userId } }
          );
        const updatedUser = await User.findOne({ where: { id: userId } });
        
        const cartItemIds = updatedUser.cartItems;
        const products = await ProductMongo.find({ productId: { $in: cartItemIds } });
        const cartItems = cartItemIds.map(id => products.find(product => product.productId.toString() === id));
        res.status(200).json(cartItems);
    } catch (error) {
        console.error(error);
        res.status(500).json('Internal Server Error');
    }
};