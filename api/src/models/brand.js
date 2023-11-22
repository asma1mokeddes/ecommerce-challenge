import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
  name: String,
  description: String,
  websiteURL: String,
  // Other relevant fields
});

brandSchema.pre("save", async function (next) {
  //   if (!this.isModified("userId")) return next();
  try {
    const count = await BrandMongo.countDocuments();
    this.brandID = count + 1;
    next();
  } catch (error) {
    next(error);
  }
});

const BrandMongo = mongoose.model("Brand", brandSchema);
export default BrandMongo;
