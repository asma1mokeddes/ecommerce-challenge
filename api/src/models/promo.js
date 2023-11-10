import mongoose from "mongoose";

const promoSchema = new mongoose.Schema({
    promoCode: {
        type: String,
        required: true,
    },
    expirationDate: {
        type: Date,
        required: false,
    },
});

const Promo = mongoose.model("Promo", promoSchema);

export default Promo;
