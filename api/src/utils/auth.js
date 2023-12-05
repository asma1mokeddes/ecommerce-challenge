import jwt from "jsonwebtoken";

export function getUserIdFromToken(token){
    try {
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        return decodedToken.user.userId;
    } catch (error) {
        console.error('Erreur lors du décodage du token:', error);
        return null; 
    }
}