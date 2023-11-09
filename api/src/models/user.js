import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    emailAddress: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: ["ROLE_USER", "ROLE_STORE_KEEPER", "ROLE_ADMIN"],
        default: "ROLE_USER",
        required: true,
    },
    cartItems: {
        type: Array,
        required: false,
        default: [],
    },
});

const UserMongo = mongoose.model("UserMongo", userSchema);

export default UserMongo;
