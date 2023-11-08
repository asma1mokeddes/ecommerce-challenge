import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.forwardemail.net",
    port: 465,
    secure: true,
    auth: {
        user: "marchemagique@gmail.com", // Remplacez par votre propre adresse e-mail
        pass: "ZU_iCu959Cw9je:w$92Gw4tm@_2Y", // Remplacez par votre propre mot de passe
    },
});

export const sendEmail = async (to, subject, text, html) => {
    const info = await transporter.sendMail({
        from: '"Marche magique 👻" <marchemagique@gmail.com>', // Remplacez par votre propre adresse e-mail
        to: to,
        subject: subject,
        text: text,
        html: html,
    });

    console.log("Message sent: %s", info.messageId);
};

export const emailing = async (req, res) => {
    // Envoi d'un e-mail de confirmation
    const to = req.body.email; // Remplacez par l'adresse e-mail de l'utilisateur
    const subject = "Confirmation d'inscription";
    const text = "Merci de vous être inscrit sur notre site.";
    const html = "<p>Merci de vous être inscrit sur notre site.</p>";

    try {
        await sendEmail(to, subject, text, html);
        res.send(
            "Inscription réussie. Un e-mail de confirmation a été envoyé."
        );
    } catch (error) {
        res.status(500).send(
            "Erreur lors de l'envoi de l'e-mail de confirmation."
        );
    }
};
