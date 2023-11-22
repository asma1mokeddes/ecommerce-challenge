import http from "http";
import app from "./app.js";
import { Sequelize } from "sequelize";
import { Umzug } from "umzug";

let envFile = ".env";
if (fs.existsSync(".env.local")) {
  envFile = ".env.local";
}

dotenv.config({ path: envFile });
console.log("process.env.POSTGRES_URI ====", process.env.POSTGRES_URI);
const PORT = process.env.PORT || 3000;
app.set("port", PORT);
const sequelize = new Sequelize(process.env.POSTGRES_URI, {
  logging: false,
});

async function runMigrations() {
  const umzug = new Umzug({
    migrations: {
      path: "./migrations",
      params: [sequelize.getQueryInterface()],
    },
    storage: "sequelize",
    storageOptions: {
      sequelize: sequelize,
    },
  });

  await umzug.up();
}

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");

    await runMigrations();
    console.log("All migrations performed successfully");

    const server = http.createServer(app);

    console.log(`listening on port ${PORT}`);
    server.listen(0, () => console.log(server.address().port));
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
}

startServer();
