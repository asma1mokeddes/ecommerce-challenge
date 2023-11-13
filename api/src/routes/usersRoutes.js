import User from "../models/user.model.js";
import UserMongo from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
        const { firstName, lastName, emailAddress, password, role } = req.body;
        if (!firstName || !lastName || !emailAddress || !password) {
            return res.status(400).json({
                message:
                    "Champs requis manquants. Veuillez fournir firstName, lastName, emailAddress et password.",
            });
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
                password: hashedPassword,
                passwordModificationDate: new Date(),
                role: role,
            });
            await UserMongo.create({
                firstName,
                lastName,
                emailAddress,
                role: role,
            });

            res.status(201).json({
                message: "Utilisateur créé avec succès",
                firstName: createdUserMongo.firstName,
                lastName: createdUserMongo.lastName,
                emailAddress: createdUserMongo.emailAddress,
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

export const updateUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const { firstName, lastName, emailAddress, password, role } = req.body;

        // Vérifier si un utilisateur existe avec la même adresse email
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

        // Mise à jour dans PostgreSQL
        const [numPsql, updatedUserPsql] = await User.update(
            { firstName, lastName, emailAddress, password, role },
            { where: { id: userId } }
        );

        // Mise à jour dans MongoDB
        const updatedUserMongo = await UserMongo.findOneAndUpdate(
            { userId: userId },
            {
                firstName: firstName,
                lastName: lastName,
                emailAddress: emailAddress,
                role: role,
            },
            { new: true }
        );

        if (updatedUserMongo && numPsql === 1) {
            const user = {
                userId: updatedUserMongo.userId,
                firstName: updatedUserMongo.firstName,
                lastName: updatedUserMongo.lastName,
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
        console.log("existingUser", existingUser);

        if (!existingUser) {
            return res.status(409).json({
                message: "Cet utilisateur n'existe pas.",
            });
        }
        // Delete User in PostgreSQL
        const deletedUserPsql = await User.destroy({
            where: { id: userId },
        });

        console.log("deletedUserPsql", deletedUserPsql);

        // Delete category in MongoDB
        const deletedUserMongo = await UserMongo.findOneAndDelete({
            userId: userId,
        });

        console.log("deletedUserMongo", deletedUserMongo);

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
