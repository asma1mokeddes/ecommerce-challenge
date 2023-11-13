import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const authRole = req.params.role;

    if (authHeader) {
        const token = authHeader.split(" ")[1];
        try {
            const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
            req.user = decodedToken;
            const userId = decodedToken.userId;
            req.auth = {
                userId: userId,
            };
            next();
        } catch (error) {
            res.status(401).send("Token invalide");
        }
    } else {
        res.status(401).send("Authentification requise");
    }
};

export default authMiddleware;
