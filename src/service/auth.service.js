import bcrypt from "bcrypt";

import userModel from "../model/user.model.js";
import TOKEN from "../util/token.js";

const getUsers = async () => {
	const users = await userModel.find({});
	return users;
};

const getUser = async () => {
	const user = await userModel.findOne({ username: username });
	if (!user) throw "Can not find user";
	return user;
};

const verifyUser = async (username, password) => {
	const user = await userModel.findOne({ username: username });

	const pwdCorrect =
		user === null ? false : await bcrypt.compare(password, user.hashPwd);

	if (!(user && pwdCorrect)) {
		throw "Invalid username or password";
	}

	const data = {
		username: user.username,
		id: user._id,
	};

	const token = TOKEN.generate(data);
	return { data, token };
};

const createUser = async (username, password) => {
	const createdUsername = await userModel.find({ username: username });

	if (createdUsername.length !== 0) throw "Username already exists";

	const SALT = 10;
	const hashPwd = await bcrypt.hash(password, SALT);

	const newUser = new userModel({
		username: username,
		hashPwd: hashPwd,
		createdAt: Date.now(),
	});
	await userModel.create(newUser);
};

const authService = { getUsers, createUser, verifyUser, getUser };

export default authService;
