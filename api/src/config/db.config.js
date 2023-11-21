import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import fs from "fs";

let envFile = ".env";
if (fs.existsSync(".env.local")) {
    envFile = ".env.local";
}
console.log("cool ====",envFile);
dotenv.config({ path: envFile });
console.log("process.env.POSTGRES_URI ====", process.env.POSTGRES_URI);
const sequelize = new Sequelize(process.env.POSTGRES_URI, {
   logging: true,
});

sequelize.sync({force: true});
   
export default sequelize;

