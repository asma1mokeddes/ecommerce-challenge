import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userId: {
        type: Number,
        unique: true,
    },
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
    dateOfBirth: {
        type: Date,
        required: true,
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

// Fonction pour générer un nouvel ID auto-incrémenté
userSchema.pre("save", async function (next) {
    try {
        if (!this.userId) {
            const count = await UserMongo.countDocuments();
            this.userId = count + 1;
        }
        next();
    } catch (error) {
        next(error);
    }
});

const UserMongo = mongoose.model("UserMongo", userSchema);

export default UserMongo;
