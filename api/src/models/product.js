import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  stockQuantity: Number,
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  brand: { type: mongoose.Schema.Types.ObjectId, ref: "Brand" },
  isPromotion: Boolean,
  // Other relevant fields
});

productSchema.pre("save", async function (next) {
  //   if (!this.isModified("userId")) return next();
  try {
    const count = await ProductMongo.countDocuments();
    this.productID = count + 1;
    next();
  } catch (error) {
    next(error);
  }
});

const ProductMongo = mongoose.model("Product", productSchema);
export default ProductMongo;
