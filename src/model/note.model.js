import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
	{
		title: String,
		content: String,
		createdAt: Date,
	},
	{ timestamps: true }
);

export default mongoose.model("Note", noteSchema);
