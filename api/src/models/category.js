import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true,
    },
});

const CategoryMongo = mongoose.model("Categories", categorySchema);

export default CategoryMongo;
