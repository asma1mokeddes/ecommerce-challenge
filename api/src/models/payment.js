import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  type: String, // e.g., 'Stripe', 'PayPal'
  amount: Number,
  dateProcessed: Date,
  order: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
  // Other relevant fields
});

paymentSchema.pre("save", async function (next) {
  //   if (!this.isModified("userId")) return next();
  try {
    const count = await PaymentMongo.countDocuments();
    this.paymentID = count + 1;
    next();
  } catch (error) {
    next(error);
  }
});

const PaymentMongo = mongoose.model("Payment", paymentSchema);
export default PaymentMongo;
