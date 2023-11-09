const userManagementMiddleware = (req, res, next) => {
    const userRole = req.user.role;

    if (req.user && userRole === `ROLE_ADMIN`) {
        try {
            // Accordé l'accès
            next();
        } catch (error) {
            res.status(403).send("Acces denied for this user's role");
        }
    } else {
        console.log("hey");
    }
};

export default userManagementMiddleware;
