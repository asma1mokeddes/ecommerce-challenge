import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
    try {
        const { firstName, lastName, emailAddress, password, role } = req.body;

        if (!(firstName && lastName && emailAddress && password && role))
            throw new Error("Invalid arguments");

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
            role,
        });

        console.log("user", user);

        const payload = {
            userId: user._id,
        };

        const options = {
            expiresIn: "12h",
        };

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
