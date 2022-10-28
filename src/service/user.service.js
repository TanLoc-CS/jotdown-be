import bcrypt from "bcrypt";
import userModel from "../model/user.model.js";

const getUser = async () => {};

const createUser = async (username, password) => {
	const createdUsername = await userModel.find({ username: username });
	if (createdUsername) throw "Username already exists";

	const SALT = 10;
	const hashPwd = await bcrypt.hash(password, SALT);

	const newUser = new userModel({
		username: username,
		hashPwd: hashPwd,
		createdAt: Date.now(),
	});

	return await userModel.create(newUser);
};

const userService = { getUser, createUser };

export default userService;
