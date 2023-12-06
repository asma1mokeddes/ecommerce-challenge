import mongoose from "mongoose";
import "./category.js";
import "./brand.js";
import "./promo.js";

const productSchema = new mongoose.Schema({
    productId: {
        type: Number,
        unique: true,
    },
    productName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {   
        type: String,
        required: true,
    },
    newProduct: {
        type: Boolean,
        required: false,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Brand",
    },
    promo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Promo",
    },
});

// Fonction pour générer un nouvel ID auto-incrémenté
productSchema.pre("save", async function (next) {
    try {
        if (!this.productId) {
            const count = await ProductMongo.countDocuments();
            this.productId = count + 1;
        }
        next();
    } catch (error) {
        next(error);
    }
});
const ProductMongo = mongoose.model("Product", productSchema);

export default ProductMongo;
