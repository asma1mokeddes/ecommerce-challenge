import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  dateCreated: { type: Date, default: Date.now },
  status: String,
  totalPrice: Number,
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  // Other relevant fields
});

orderSchema.pre("save", async function (next) {
  //   if (!this.isModified("userId")) return next();
  try {
    const count = await OrderMongo.countDocuments();
    this.orderID = count + 1;
    next();
  } catch (error) {
    next(error);
  }
});

const OrderMongo = mongoose.model("Order", orderSchema);
export default OrderMongo;
