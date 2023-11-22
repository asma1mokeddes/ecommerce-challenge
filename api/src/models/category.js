import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    categoryId: {
        type: Number,
        unique: true,
    },
    categoryName: {
        type: String,
        required: true,
    },
});

// Fonction pour générer un nouvel ID auto-incrémenté
categorySchema.pre("save", async function (next) {
    try {
        if (!this.categoryId) {
            const count = await CategoryMongo.countDocuments();
            this.categoryId = count + 1;
        }
        next();
    } catch (error) {
        next(error);
    }
});

const CategoryMongo = mongoose.model("Category", categorySchema);

export default CategoryMongo;
