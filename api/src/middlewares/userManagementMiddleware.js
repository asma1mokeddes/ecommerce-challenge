const userManagementMiddleware = (req, res, next) => {
    try {
        // Assurez-vous que l'utilisateur est authentifié et que le rôle est défini
        if (req.user && req.user.role) {
            const userRole = req.user.role;

            // Accordé l'accès uniquement aux utilisateurs avec le rôle 'ROLE_ADMIN'
            if (userRole === "ROLE_ADMIN") {
                next(); // Autorise l'accès
            } else {
                res.status(403).send("Accès interdit pour cet utilisateur");
            }
        } else {
            res.status(401).send("Non autorisé. Veuillez vous connecter.");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(
            "Une erreur est survenue lors de la vérification des autorisations."
        );
    }
};

export default userManagementMiddleware;
