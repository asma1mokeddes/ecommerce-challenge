import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  // Define your user schema fields here
  username: String,
  email: String,
  password: String,
  dateCreated: { type: Date, default: Date.now },
  lastPasswordChangeDate: Date,
  userRole: String,
  accountStatus: String,
});

userSchema.pre("save", async function (next) {
  //   if (!this.isModified("userId")) return next();
  try {
    const count = await UserMongo.countDocuments();
    this.userId = count + 1;
    next();
  } catch (error) {
    next(error);
  }
});

const UserMongo = mongoose.model("User", userSchema);
export default UserMongo;
