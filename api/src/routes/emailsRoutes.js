import SibApiV3Sdk from "sib-api-v3-sdk";
import User from "../models/user.js";
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
        const resetToken = jwt.sign(
            { userId: user._id },
            process.env.SECRET_KEY,
            {
                expiresIn: "1h", // Durée de validité du jeton de réinitialisation
            }
        );

        // Enregistrer le jeton dans la base de données (vous devrez ajouter un champ à votre modèle utilisateur pour stocker le jeton)
        user.resetToken = resetToken;
        await user.save();

        // Appel à la fonction sendPasswordResetEmail pour envoyer le mail de rénitialisation de mot de passe
        await sendPasswordResetEmail(req, res);

        res.json({
            message:
                "Le e-mail de réinitialisation de mot de passe a été envoyé avec succès",
        });
    } catch (error) {
        console.error(
            "Erreur lors de la réinitialisation du mot de passe :",
            error
        );
        res.status(500).json({
            error: "Une erreur est survenue lors de la réinitialisation du mot de passe",
        });
    }
};

export const sendActivationEmail = async (req, res) => {
    // Définir les valeurs spécifiques pour to et sender
    const to = req.body.emailAddress; // Remplacez avec le champ approprié

    await sendEmailWithTemplate(res, 1, to, sender);
};

// Confirmation d'activation de compte
export const sendActivatedAccountEmail = async (req, res) => {
    const to = req.body.emailAddress;
    await sendEmailWithTemplate(res, 4, to, sender);
};

export const sendPasswordResetEmail = async (req, res) => {
    const to = req.body.emailAddress;
    await sendEmailWithTemplate(res, 2, to, sender);
};

// Fonction générique pour envoyer des e-mails avec différents templates
export const sendEmailWithTemplate = async (res, templateId, to, sender) => {
    try {
        // Configure API key authorization: api-key
        let apiKey = defaultClient.authentications["api-key"];
        apiKey.apiKey = process.env.BREVO_API_KEY;

        // Uncomment below two lines to configure authorization using: partner-key
        // let partnerKey = defaultClient.authentications['partner-key'];
        // partnerKey.apiKey = 'YOUR API KEY';

        let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

        let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail(); // SendSmtpEmail | Values to send a transactional email

        sendSmtpEmail = {
            to: [
                {
                    email: to,
                },
            ],
            templateId,
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
