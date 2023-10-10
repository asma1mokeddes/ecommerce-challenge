import User from "../models/user.js";

export const getUsers = async (req, res) => {
    try {
        const users = await User.find({}, { password: 0 });
        res.json(users);
    } catch (error) {
        res.status(500).json({
            error: `Une erreur est survenue lors de la récupération des utilisateurs : ${error}`,
        });
    }
};

