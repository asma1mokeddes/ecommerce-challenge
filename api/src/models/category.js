import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: String,
  description: String,
  // Other relevant fields
});

categorySchema.pre("save", async function (next) {
  //   if (!this.isModified("userId")) return next();
  try {
    const count = await CategoryMongo.countDocuments();
    this.categoryID = count + 1;
    next();
  } catch (error) {
    next(error);
  }
});

const CategoryMongo = mongoose.model("Category", categorySchema);
export default CategoryMongo;
