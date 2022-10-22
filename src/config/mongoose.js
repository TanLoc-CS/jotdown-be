import mongoose from "mongoose";
import dotenv, { config } from "dotenv";
import logger from "../util/logger.js";

dotenv.config();
const URI = process.env.MONGODB_URI;

export default async () => {
	try {
		mongoose
			.connect(URI)
			.then((result) => {
				logger.info("Connected to MongoDB");
			})
			.catch((error) => console.log(error));
	} catch (error) {
		logger.error("Error connecting to MongoDB:", error);
	}
};
