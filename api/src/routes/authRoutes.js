import UserMongo from "../models/user.js";
import User from "../models/user.model.js";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
    try {
        const { firstName, lastName, emailAddress, dateOfBirth, password } =
            req.body;

        if (!(firstName && lastName && emailAddress && password && dateOfBirth))
            throw new Error("Invalid arguments");

        const hashedPassword = await bcrypt.hash(password, 10);

        let createdUserPsql = await User.findOne({
            where: {
                emailAddress: emailAddress,
                password: hashedPassword,
            },
        });

        let createdUserMongo = await UserMongo.findOne({
            emailAddress,
        });

        if (!createdUserPsql && !createdUserMongo) {
            await User.create({
                firstName,
                lastName,
                emailAddress,
                dateOfBirth,
                password: hashedPassword,
                passwordModificationDate: new Date(),
                role: `ROLE_USER`,
            });

            await UserMongo.create({
                firstName,
                lastName,
                emailAddress,
                dateOfBirth,
                role: `ROLE_USER`,
            });

            res.status(201).json({
                message: "Compte créé avec succès",
            });
        } else {
            res.status(409).json({
                error: "Un utilisateur ayant un compte avec cette adresse email existe déjà",
            });
        }
    } catch (error) {
        res.status(500).json({
            error: `Une erreur est survenue lors de la création de l'utilisateur : ${
                error.message || error
            }`,
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
            role: user.role,
        };

        const options = {
            expiresIn: "2h",
        };

        const token = jwt.sign(payload, process.env.SECRET_KEY, options);

        res.json({ email: emailAddress, token });
    } catch (error) {
        res.status(500).json({
            error: `Une erreur est survenue lors de la connexion : ${error}`,
        });
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        res.json({ message: "Déconnexion réussie" });
    } catch (error) {
        res.status(500).json({
            error: `Une erreur est survenue lors de la déconnexion : ${error}`,
        });
    }
};
