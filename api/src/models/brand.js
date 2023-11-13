import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
    brandId: {
        type: Number,
        unique: true,
    },
    brandName: {
        type: String,
        required: true,
    },
});

brandSchema.pre("save", async function (next) {
    try {
        if (!this.brandId) {
            const count = await BrandMongo.countDocuments();
            this.brandId = count + 1;
        }
        next();
    } catch (error) {
        next(error);
    }
});
const BrandMongo = mongoose.model("Brand", brandSchema);

export default BrandMongo;
