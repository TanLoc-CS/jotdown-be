import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// import logger from "./util/logger.js";
import mongoose from "./config/mongoose.js";
import api from "./controller/index.js";

dotenv.config();
const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", api);
await mongoose();

app.listen(PORT, () => {
	console.log(`[SERVER] Server running on port ${PORT}`);
});
