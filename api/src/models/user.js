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
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["ROLE_USER", "ROLE_STORE_KEEPER", "ROLE_ADMIN"],
        defalut: "user",
        required: true,
    },
});

const User = mongoose.model("User", userSchema);

export default User;
