import mongoose from "mongoose";

const promoSchema = new mongoose.Schema({
    promoId: {
        type: Number,
        unique: true,
    },
    promoCode: {
        type: String,
        required: true,
    },
    expirationDate: {
        type: Date,
        required: false,
    },
});

// Fonction pour générer un nouvel ID auto-incrémenté
promoSchema.pre("save", async function (next) {
    try {
        if (!this.promoId) {
            const count = await PromoMongo.countDocuments();
            this.promoId = count + 1;
        }
        next();
    } catch (error) {
        next(error);
    }
});
const PromoMongo = mongoose.model("Promo", promoSchema);

export default PromoMongo;
