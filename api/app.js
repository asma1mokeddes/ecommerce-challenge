import express from "express";
import mongoose from "mongoose";
import auth from "./src/router/authRouter.js";
import users from "./src/router/usersRouter.js";
import products from "./src/router/productsRouter.js";
import categories from "./src/router/categoriesRouter.js";
import promos from "./src/router/promosRouter.js";
import brands from "./src/router/brandsRouter.js";
import emails from "./src/router/emailsRouter.js";

import dotenv from "dotenv";
import cors from "cors";
import sequelize from "./src/config/db.config.js";

const app = express();

dotenv.config();

// Configurez le middleware CORS pour autoriser les requêtes depuis localhost:4200
app.use(
    cors({
        origin: "http://localhost:5173", // Remplacez par l'URL de votre application Angular
        credentials: true, // Si vous utilisez des cookies ou des en-têtes d'authentification, activez ceci
    })
);

app.listen(3000, () => console.log("Server is running on localhost:3000"));



app.use(express.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});

app.use("/auth", auth);
app.use("/users", users);
app.use("/products", products);
app.use("/categories", categories);
app.use("/promos", promos);
app.use("/brands", brands);
app.use("/emails", emails);

try {
    console.log("process.env.DB_URI ====", process.env.DB_URI);
    await mongoose
        .connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log("Connexion à MongoDB réussie !"))
        .catch(() => console.log("Connexion à MongoDB échouée !"));
} catch (e) {
    console.error(e);
}

try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
} catch (e) {
    console.error("Unable to connect to the database:", e);
}

export default app;
