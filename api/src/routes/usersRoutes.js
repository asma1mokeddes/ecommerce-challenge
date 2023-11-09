import User from "../models/user.model.js";
import UserMongo from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export function validatePassword(password) {
    const pwdFilter =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return pwdFilter.test(password);
}

export const createUser = async (req, res) => {
    try {
        // Validate request
        const {
            firstName,
            lastName,
            emailAddress,
            password,
            dateOfBirth,
            role,
        } = req.body;
        if (
            !firstName ||
            !lastName ||
            !emailAddress ||
            !dateOfBirth ||
            !password ||
            !dateOfBirth
        ) {
            return res.status(400).json({
                message:
                    "Champs requis manquants. Veuillez fournir votre nom, prénom, adresse email, mot de passe et date de naissance.",
            });
        }

        if (!validatePassword(password)) {
            return res.status(409).json({
                message: `Mot de passe invalide.`,
            });
        }

        // Calculate age based on dateOfBirth
        const birthDate = new Date(dateOfBirth);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();

        // Check if the user is 18 or older
        if (age < 18) {
            throw new Error(
                "Les utilisateurs doivent avoir minimum 18 ans pour s'inscrire."
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Création de l'utilisateur sur Psql
        const createdUserPsql = await User.findOne({
            where: {
                emailAddress: emailAddress,
            },
        });
        if (!createdUserPsql) {
            await User.create({
                firstName,
                lastName,
                emailAddress,
                password: hashedPassword,
                passwordModificationDate: new Date(),
                dateOfBirth,
                role: role,
            });
        } else {
            return res.status(409).json({
                message: `L'utilisateur ayant cette adresse email ${emailAddress} est déjà utilisée.`,
            });
        }

        // Création de l'utilisateur sur Mongo

        let createdUserMongo = await UserMongo.findOne({
            where: {
                firstName,
                lastName,
                emailAddress,
                dateOfBirth,
                role: role,
            },
        });

        if (!createdUserMongo) {
            await UserMongo.create({
                firstName,
                lastName,
                emailAddress,
                dateOfBirth,
                role: role,
            });
        } else {
            return res.status(409).json({
                message: `L'utilisateur ayant cette adresse email ${emailAddress} est déjà utilisée.`,
            });
        }

        const payload = {
            userId: createdUserMongo._id,
        };

        const options = {
            expiresIn: "12h",
        };

        const token = jwt.sign(payload, process.env.SECRET_KEY, options);

        res.status(201).json({
            message: "Utilisateur créé avec succès",
            token: token,
            createdUserPsql,
            createdUserMongo,
        });
    } catch (error) {
        res.status(500).json({
            error: `Une erreur est survenue lors de la création de l'utilisateur : ${error}`,
        });
    }
};

export const getUsers = (req, res) => {
    // on recup ses infos depuis MongoDB
    UserModel.find()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving users.",
            });
        });
};

export const getUser = (req, res) => {
    const id = req.params.id;
    User.findByPk(id)
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find User with id=${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving User with id=" + id,
            });
        });
};

export const updateUser = (req, res) => {
    const id = req.params.id;

    User.update(req.body, {
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "User was updated successfully.",
                });
            } else {
                res.send({
                    message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating User with id=" + id,
            });
        });
};

export const deleteUser = (req, res) => {
    const id = req.params.id;

    User.destroy({
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "User was deleted successfully!",
                });
            } else {
                res.send({
                    message: `Cannot delete User with id=${id}. Maybe User was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Could not delete User with id=" + id,
            });
        });
};
