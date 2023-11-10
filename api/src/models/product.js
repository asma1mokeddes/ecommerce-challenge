import mongoose from "mongoose";
import "./category.js";
import "./brand.js";
import "./promo.js";

const productSchema = new mongoose.Schema({
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

const ProductMongo = mongoose.model("Product", productSchema);

export default ProductMongo;
