import { Router } from "express";
import { StatusCodes } from "http-status-codes";

import isAuthorized from "../../middleware/authentication.js";
import authService from "../../service/auth.service.js";

const authRouter = Router();

export default (app) => {
	app.use("/auth", authRouter);

	authRouter.get("/user", isAuthorized, async (req, res) => {
		try {
			const user = await authService.getUser();
			return res.status(StatusCodes.ACCEPTED).json(user);
		} catch (error) {
			returnres.status(StatusCodes.UNAUTHORIZED).json({
				error: {
					message: error,
				},
			});
		}
	});

	authRouter.post("/login", async (req, res) => {
		const { username, password } = req.body;

		try {
			const { data, token } = await authService.verifyUser(username, password);
			return res.status(StatusCodes.OK).json({ data: data, token: token });
		} catch (error) {
			return res.status(StatusCodes.UNAUTHORIZED).json({
				error: {
					message: error,
				},
			});
		}
	});

	authRouter.post("/register", async (req, res) => {
		const { username, password } = req.body;
		try {
			await authService.createUser(username, password);

			return res.status(StatusCodes.CREATED).json({
				info: {
					message: "SUCCESS_CREATED",
				},
			});
		} catch (error) {
			return res.status(StatusCodes.CONFLICT).json({
				error: {
					message: error,
				},
			});
		}
	});
};
