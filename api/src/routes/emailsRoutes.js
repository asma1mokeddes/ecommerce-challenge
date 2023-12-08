import SibApiV3Sdk from "sib-api-v3-sdk";
import User from "../models/user.model.js";
import UserMongo from "../models/user.js";
import sequelize from "../config/db.config.js";

import jwt from "jsonwebtoken";

let defaultClient = SibApiV3Sdk.ApiClient.instance;
const sender = "marchemagique@gmail.com";

export const reset = async (req, res) => {
    try {
        const { emailAddress } = req.body;

        // Vérifier si l'utilisateur existe
        const user = await User.findOne({ emailAddress });

        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        // Générer un jeton pour la réinitialisation du mot de passe
        const resetToken = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
            expiresIn: "1h",
        });

        // Enregistrer le jeton dans la base de données
        user.resetToken = resetToken;
        await user.save();

        const resetLink = `https://localhost:3002/emails/reset?token=${resetToken}`;

        // Appel à la fonction sendPasswordResetEmail pour envoyer le mail de réinitialisation de mot de passe
        await sendPasswordResetEmail(req, res, resetLink);

        // Envoyer la réponse JSON réussie ici
        res.json({
            message:
                "Le e-mail de réinitialisation de mot de passe a été envoyé avec succès",
        });
    } catch (error) {
        console.error(
            "Erreur lors de la réinitialisation du mot de passe :",
            error
        );
        // Envoyer la réponse JSON d'erreur ici
        res.status(500).json({
            error: "Une erreur est survenue lors de la réinitialisation du mot de passe",
        });
    }
};

// Route pour activer le compte
export const activate = async (req, res) => {
    const token = req.query.token;

    const t = await sequelize.transaction();

    try {
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

        const userId = decodedToken.userId;

        // Mettez à jour le statut du compte dans les bases de données :
        const [numPsql] = await User.update(
            { activated: true },
            { where: { id: userId } },
            { transaction: t }
        );
        await UserMongo.findOneAndUpdate(
            { userId: userId },
            { activated: true }
        );

        res.send(
            "Votre compte a été activé avec succès. Vous pouvez maintenant vous connecter."
        );
    } catch (error) {
        console.error("Erreur lors de l'activation du compte :", error);
        res.status(400).send("Lien d'activation non valide.");
    }
};

export const sendActivationEmail = async (req, res, activationLink) => {
    const to = req.body.emailAddress;

    await sendEmailWithTemplate(
        res,
        1,
        to,
        sender,
        activationLink,
        "activation"
    );
};

// Confirmation d'activation de compte
export const sendActivatedAccountEmail = async (req, res) => {
    const to = req.body.emailAddress;
    await sendEmailWithTemplate(res, 4, to, sender);
};

export const sendPasswordResetEmail = async (req, res, resetToken) => {
    const to = req.body.email;

    await sendEmailWithTemplate(res, 2, to, sender, resetToken, "reset");
};

// Fonction générique pour envoyer des e-mails avec différents templates
export const sendEmailWithTemplate = async (
    res,
    templateId,
    to,
    sender,
    token,
    type
) => {
    try {
        // Configure API key authorization: api-key
        let apiKey = defaultClient.authentications["api-key"];
        apiKey.apiKey = process.env.BREVO_API_KEY;

        let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

        let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

        sendSmtpEmail = {
            to: [
                {
                    email: to,
                },
            ],
            templateId,
            params: {
                [type === "reset" ? "resetToken" : "activationLink"]: token,
            },
            headers: {
                "X-Mailin-custom":
                    "custom_header_1:custom_value_1|custom_header_2:custom_value_2",
            },
        };

        await apiInstance.sendTransacEmail(sendSmtpEmail);
    } catch (error) {
        console.error("Erreur lors de l'envoi de l'e-mail :", error);
        return res
            .status(500)
            .json({ error: "Erreur lors de l'envoi de l'e-mail" });
    }
};
