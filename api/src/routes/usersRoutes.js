import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createUser = async (req, res) => {
    try {
        // Validate request
        const { firstName, lastName, emailAddress, password } = req.body;
        if (!firstName || !lastName || !emailAddress || !password) {
            return res.status(400).json({
                message:
                    "Champs requis manquants. Veuillez fournir firstName, lastName, emailAddress et password.",
            });
        }

        // Vérifiez si l'utilisateur existe déjà
        const existingUser = await User.findOne({
            where: {
                emailAddress: emailAddress,
            },
        });
        if (existingUser) {
            return res.status(409).json({
                message: `L'adresse email ${emailAddress} est déjà utilisée.`,
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Créer un utilisateur
        const user = await User.create({
            firstName,
            lastName,
            emailAddress,
            password: hashedPassword,
            passwordModificationDate: new Date(),
            role: "ROLE_USER",
        });

        const payload = {
            userId: user._id,
        };

        const options = {
            expiresIn: "12h",
        };

        const token = jwt.sign(payload, process.env.SECRET_KEY, options);
        res.status(201).json({
            message: "Utilisateur créé avec succès",
            token: token,
        });
    } catch (error) {
        res.status(500).json({
            error: `Une erreur est survenue lors de la création de l'utilisateur : ${error}`,
        });
    }
};

export const getUsers = (req, res) => {
    //{ attributes: { exclude: ["password"]}
    User.findAll()
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
