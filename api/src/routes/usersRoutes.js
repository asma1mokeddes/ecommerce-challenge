import User from "../models/user.model.js";
import UserMongo from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Op from "sequelize";

export function validatePassword(password) {
    const pwdFilter =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return pwdFilter.test(password);
}

export const getUsers = async (req, res) => {
    try {
        const usersMongo = await UserMongo.find();
        res.json(usersMongo);
    } catch (err) {
        res.status(500).json({
            message:
                err.message ||
                "Une erreur est survenue lors de la récupération des utilisateurs.",
        });
    }
};

export const getUser = async (req, res) => {
    const userId = req.params.userId;

    await UserMongo.findOne({ userId: userId })
        .then((data) => {
            if (data) {
                const user = {
                    userId: data.userId,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    dateOfBirth: data.dateOfBirth,
                    emailAddress: data.emailAddress,
                    role: data.role,
                };
                res.send(user);
            } else {
                res.status(404).send({
                    message: `L'utilisateur avec l'id=${userId} n'existe pas.`,
                });
            }
        })
        .catch((error) => {
            res.status(500).send({
                message: `Une erreur est survenue lors de la récupération de l'utilisateur avec l'id=${userId} : ${error}`,
            });
        });
};

export const createUser = async (req, res) => {
    try {
        // Validate request
        const {
            firstName,
            lastName,
            emailAddress,
            dateOfBirth,
            password,
            role,
        } = req.body;
        if (
            !firstName ||
            !lastName ||
            !emailAddress ||
            !password ||
            !dateOfBirth
        ) {
            return res.status(400).json({
                message:
                    "Champs requis manquants. Veuillez fournir nom, prénom, email, dateDeNaissance et motDePasse.",
            });
        }

        const birthDate = new Date(dateOfBirth);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();

        // Check if the user is 18 or older
        if (age < 18) {
            throw new Error(
                "Les utilisateurs doivent avoir minimum 18 ans pour s'inscrire."
            );
        }

        if (!validatePassword(password)) {
            return res.status(409).json({
                message: `Mot de passe invalide.`,
            });
        }

        // Vérifiez si l'utilisateur existe déjà
        let createdUserPsql = await User.findOne({
            where: {
                emailAddress: emailAddress,
            },
        });

        let createdUserMongo = await UserMongo.findOne({
            emailAddress,
        });

        const hashedPassword = await bcrypt.hash(password, 10);

        if (!createdUserMongo && !createdUserPsql) {
            createdUserMongo = await User.create({
                firstName,
                lastName,
                emailAddress,
                dateOfBirth,
                password: hashedPassword,
                passwordModificationDate: new Date(),
                role: role,
            });
            await UserMongo.create({
                firstName,
                lastName,
                emailAddress,
                dateOfBirth,
                role: role,
            });

            res.status(201).json({
                message: "Utilisateur créé avec succès",
                firstName: createdUserMongo.firstName,
                lastName: createdUserMongo.lastName,
                emailAddress: createdUserMongo.emailAddress,
                dateOfBirth: createdUserMongo.dateOfBirth,
            });
        } else {
            res.status(409).json({
                error: `Cet utilisateur existe déjà`,
            });
        }
    } catch (error) {
        res.status(500).json({
            error: `Une erreur est survenue lors de la création de l'utilisateur : ${error}`,
        });
    }
};

// TO FIX

export const updateUser = async (req, res) => {
    try {
        const userId = req.params.userId;

        console.log("req.body ====", req.body);
        const birthDate = new Date(req.body.dateOfBirth);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();

        // Check if the user is 18 or older
        if (age < 18) {
            throw new Error(
                "Les utilisateurs doivent avoir minimum 18 ans pour s'inscrire."
            );
        }

        // Vérifier si un utilisateur existe avec la même adresse email
        const existingUser = await User.findOne({
            where: {
                id: {
                    [Op.ne]: userId, // Exclude the current user from the check
                },
            },
        });
        console.log("existingUser  ====", existingUser);

        if (existingUser) {
            return res.status(409).json({
                message: "Cet utilisateur existe déjà.",
            });
        }

        // Mise à jour dans PostgreSQL
        const { id, ...updateData } = req.body;

        const [numPsql] = await User.update(updateData, {
            where: { id: userId },
        });

        // Mise à jour dans MongoDB
        const updatedUserMongo = await UserMongo.findOneAndUpdate(
            { userId: userId },
            req.body,
            { new: true }
        );

        if (updatedUserMongo && numPsql === 1) {
            const user = {
                userId: updatedUserMongo.userId,
                firstName: updatedUserMongo.firstName,
                lastName: updatedUserMongo.lastName,
                dateOfBirth: updatedUserMongo.dateOfBirth,
                emailAddress: updatedUserMongo.emailAddress,
                role: updatedUserMongo.role,
            };

            return res.json({
                message: "L'utilisateur a bien été mis à jour.",
                user,
            });
        } else {
            return res.status(404).json({
                message: `L'utilisateur avec l'ID ${userId} n'existe pas.`,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: `Une erreur est survenue lors de la modification de cet utilisateur : ${error}`,
        });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const userId = req.params.userId;

        const existingUser = await User.findOne({
            where: {
                id: userId,
            },
        });

        if (!existingUser) {
            return res.status(409).json({
                message: "Cet utilisateur n'existe pas.",
            });
        }
        // Delete User in PostgreSQL
        const deletedUserPsql = await User.destroy({
            where: { id: userId },
        });

        // Delete category in MongoDB
        const deletedUserMongo = await UserMongo.findOneAndDelete({
            userId: userId,
        });

        if (deletedUserPsql === 1 && deletedUserMongo) {
            res.json({
                message: "L'utilisateur a bien été supprimé !",
            });
        } else {
            res.status(404).json({
                message: `Impossible de supprimer l'utilisateur avec id=${userId}.`,
            });
        }
    } catch (err) {
        res.status(500).json({
            message: `Erreur lors de la suppression de cet utilisateur`,
        });
    }
};
