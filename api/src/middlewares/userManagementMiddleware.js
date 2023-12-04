import jwt from "jsonwebtoken";

// Middleware pour l'ADMIN
export const adminMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]; // Assuming you are passing the token in the "Authorization" header
        if (!token) {
            return res.status(401).json({ message: "Token non fourni" });
        }

        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

        const userRole = decodedToken.user.role;

        console.log("userRole =====", userRole);

        if (userRole === "ROLE_ADMIN") {
            next();
        } else {
            res.status(403).send("ADMIN, Accès interdit pour cet utilisateur");
        }
    } catch (error) {
        console.error(error);
        if (error.name === "TokenExpiredError") {
            res.status(401).send("Token expiré");
        } else {
            res.status(500).send(
                "Une erreur est survenue lors de la vérification des autorisations."
            );
        }
    }
};

// Middleware pour le magasinier
export const storeKeeperMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]; // Assuming you are passing the token in the "Authorization" header
        if (!token) {
            return res.status(401).json({ message: "Token non fourni" });
        }

        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

        const userRole = decodedToken.user.role;

        if (userRole === "ROLE_STORE_KEEPER") {
            next();
        } else {
            res.status(403).send(
                "Accès interdit pour cet utilisateur 'magasinier'"
            );
        }
    } catch (error) {
        console.error(error);
        if (error.name === "TokenExpiredError") {
            res.status(401).send("Token expiré");
        } else {
            res.status(500).send(
                "Une erreur est survenue lors de la vérification des autorisations."
            );
        }
    }
};

// Middleware pour l'utilisateur
export const userMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]; // Assuming you are passing the token in the "Authorization" header
        if (!token) {
            return res.status(401).json({ message: "Token non fourni" });
        }

        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

        const userRole = decodedToken.user.role;

        if (userRole === "ROLE_USER") {
            next();
        } else {
            res.status(403).send("Accès interdit pour cet utilisateur 'user'");
        }
    } catch (error) {
        console.error(error);
        if (error.name === "TokenExpiredError") {
            res.status(401).send("Token expiré");
        } else {
            res.status(500).send(
                "Une erreur est survenue lors de la vérification des autorisations."
            );
        }
    }
};

export const adminOrStoreKeeperMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Token non fourni" });
        }

        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

        const userRole = decodedToken.user.role;

        if (userRole === "ROLE_ADMIN" || userRole === "ROLE_STORE_KEEPER") {
            next();
        } else {
            res.status(403).send("Accès interdit pour cet utilisateur 'user'");
        }
    } catch (error) {
        console.error(error);
        if (error.name === "TokenExpiredError") {
            res.status(401).send("Token expiré");
        } else {
            res.status(500).send(
                "Une erreur est survenue lors de la vérification des autorisations."
            );
        }
    }
};
