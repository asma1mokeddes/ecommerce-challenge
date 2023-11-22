import mongoose from "mongoose";

const orderDetailsSchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  quantity: Number,
  pricePerUnit: Number,
  // Other relevant fields
});

orderDetailsSchema.pre("save", async function (next) {
  //   if (!this.isModified("userId")) return next();
  try {
    const count = await OrderDetailsMongo.countDocuments();
    this.orderDetailsID = count + 1;
    next();
  } catch (error) {
    next(error);
  }
});

const OrderDetailsMongo = mongoose.model("OrderDetails", orderDetailsSchema);
export default OrderDetailsMongo;
