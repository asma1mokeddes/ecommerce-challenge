import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
    brandName: {
        type: String,
        required: true,
    },
});

const BrandMongo = mongoose.model("Brand", brandSchema);

export default BrandMongo;
