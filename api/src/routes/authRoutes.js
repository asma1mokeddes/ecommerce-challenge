import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            emailAddress,
            password,
            role,
            dateOfBirth,
        } = req.body;

        if (
            !(
                firstName &&
                lastName &&
                emailAddress &&
                password &&
                role &&
                dateOfBirth
            )
        )
            throw new Error("Invalid arguments");

        // Calculate age based on dateOfBirth
        const birthDate = new Date(dateOfBirth);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        // Check if the user is 18 or older
        if (age < 18) {
            throw new Error("Users must be 18 years or older.");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const existingUser = await User.findOne({
            where: {
                emailAddress: emailAddress,
            },
        });
        if (existingUser)
            throw new Error(
                `L'adresse email ${emailAddress} est déjà utilisée`
            );

        const user = new User({
            firstName,
            lastName,
            emailAddress,
            password: hashedPassword,
            dateOfBirth,
            role,
        });

        console.log("user", user);

        await user.save();

        res.json({
            message: "Utilisateur créé avec succès",
        });
    } catch (error) {
        res.status(500).json({
            error: `Une erreur est survenue lors de la création de l'utilisateur : ${error}`,
        });
    }
};

export const login = async (req, res) => {
    try {
        const { emailAddress, password } = req.body;

        const user = await User.findOne({ emailAddress });
        if (!user) {
            return res.status(401).json({ message: "Identifiants invalides" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Identifiants invalides" });
        }

        const payload = {
            userId: user._id,
        };

        const options = {
            expiresIn: "12h",
        };

        const token = jwt.sign(payload, process.env.SECRET_KEY, options);

        res.json({ user, token });
    } catch (error) {
        res.status(500).json({
            error: `Une erreur est survenue lors de la connexion : ${error}`,
        });
    }
};

export const logout = async (req, res) => {
    try {
        res.json({ message: "Déconnexion réussie" });
    } catch (error) {
        res.status(500).json({
            error: `Une erreur est survenue lors de la déconnexion : ${error}`,
        });
    }
};
