import { Stripe } from "stripe";
import dotenv from "dotenv";
import fs from "fs";

let envFile = ".env";
if (fs.existsSync(".env.local")) {
	envFile = ".env.local";
}

dotenv.config({ path: envFile });

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default stripe;