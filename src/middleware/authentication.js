import { StatusCodes } from "http-status-codes";

import TOKEN from "../util/token.js";

// const unknownEndpoint = (req, res) => {
// 	res.status(404).send({ error: "unknown endpoint" });
// };

function isAuthorized(req, res, next) {
	const token = TOKEN.extract(req);
	try {
		const decoded = TOKEN.verify(token);
		req.id = decoded._id;
		next();
	} catch (error) {
		res.sendStatus(StatusCodes.UNAUTHORIZED).json({
			error: {
				message: error,
			},
		});
	}
}

export default isAuthorized;
