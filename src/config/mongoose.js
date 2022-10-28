import mongoose from "mongoose";
import dotenv from "dotenv";
import logger from "../util/logger.js";

dotenv.config();
const URI = process.env.MONGODB_URI;

export default async () => {
	try {
		mongoose
			.connect(URI)
			.then((result) => {
				logger.info("[DATABASE] Connected to MongoDB");
			})
			.catch((error) => console.log(error));
	} catch (error) {
		logger.error("[DBS] Error connecting to MongoDB:", error);
	}
};
