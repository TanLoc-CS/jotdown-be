import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	username: String,
	hashPwd: String,
	createdAt: Date,
	notes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Note",
		},
	],
});

userSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
		delete returnedObject.passwordHash;
	},
});

export default mongoose.model("User", userSchema);
