// Middleware pour l'administrateur
export const adminMiddleware = (req, res, next) => {
    console.log("role =====", req.user.role);
    try {
        if (req.user && req.user.role === "ROLE_ADMIN") {
            next();
        } else {
            res.status(403).send("Accès interdit pour cet utilisateur");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(
            "Une erreur est survenue lors de la vérification des autorisations."
        );
    }
};

// Middleware pour le magasinier
export const storeKeeperMiddleware = (req, res, next) => {
    try {
        if (req.user && req.user.role === "ROLE_STORE_KEEPER") {
            next();
        } else {
            res.status(403).send("Accès interdit pour cet utilisateur");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(
            "Une erreur est survenue lors de la vérification des autorisations."
        );
    }
};

// Middleware pour l'utilisateur
export const userMiddleware = (req, res, next) => {
    try {
        if (req.user && req.user.role === "ROLE_USER") {
            next();
        } else {
            res.status(403).send("Accès interdit pour cet utilisateur");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(
            "Une erreur est survenue lors de la vérification des autorisations."
        );
    }
};

export const adminOrStoreKeeperMiddleware = (req, res, next) => {
    try {
        const userRole = req.user && req.user.role;

        console.log("userRole ==", userRole);
        if (userRole === "ROLE_ADMIN" || userRole === "ROLE_STORE_KEEPER") {
            next(); // Autorise l'accès
        } else {
            res.status(403).send("Accès interdit pour cet utilisateur");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(
            "Une erreur est survenue lors de la vérification des autorisations."
        );
    }
};
