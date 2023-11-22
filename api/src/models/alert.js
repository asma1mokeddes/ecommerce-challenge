import mongoose from "mongoose";

const alertSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  type: String, // e.g., 'New Product', 'Restock', 'Price Change'
  isEnabled: Boolean,
  // Other relevant fields
});

alertSchema.pre("save", async function (next) {
  //   if (!this.isModified("userId")) return next();
  try {
    const count = await mongoose.model("Alert").countDocuments();
    this.alertID = count + 1;
    next();
  } catch (error) {
    next(error);
  }
});

const AlertMongo = mongoose.model("Alert", alertSchema);
export default AlertMongo;
