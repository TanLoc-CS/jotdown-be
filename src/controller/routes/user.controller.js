import { Router } from "express";
import { StatusCodes } from "http-status-codes";

import userService from "../../service/user.service.js";

const userRouter = Router();

export default (app) => {
	app.use("/", userRouter);

	userRouter.post("/register", async (req, res) => {
		const { username, password } = req.body;
		try {
			const newUser = await userService.createUser(username, password);
			res.status(StatusCodes.CREATED).json(newUser);
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
