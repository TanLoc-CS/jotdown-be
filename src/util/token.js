import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;

const generate = (data) => {
	const token = jwt.sign(data, SECRET);
	return token;
};

const extract = (req) => {
	const header = req.headers["authorization"];

	if (typeof header === "undefined") throw "Invalid token";

	const bearer = header.split(" ");
	return bearer[1];
};

const verify = (token) => {
	const data = jwt.verify(token, process.env.JWT_SECRET);
	if (!data) throw "Invalid token";

	return data;
};

const TOKEN = { generate, extract, verify };
export default TOKEN;
