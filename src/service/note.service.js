// import logger from "../util/logger";
import noteModel from "../model/note.model.js";
import userModel from "../model/user.model.js";

const getNotes = async (userId) => {
	const notes = noteModel.find({ userId: userId }).then((notes) => notes);
	return notes;
};

const getNotebyId = async (id) => {
	const note = noteModel.find({ id: id }).then((note) => note);
	if (!note) throw "NOTE NOT FOUND!";
	return note;
};

const getNotebyTitle = async (searchValue) => {
	const notes = await noteModel.find({}).then((notes) => notes);
	return notes.filter(
		(note) => note.title.toLowerCase().indexOf(searchValue) !== -1
	);
};

const createNote = async (title, content, userId) => {
	const user = await userModel.findById(userId);
	console.log(user);
	const note = new noteModel({
		title: title,
		content: content,
		date: Date.now(),
		userId: userId,
	});

	const savedNote = await noteModel.create(note);
	console.log((user.notes = user.notes.concat(savedNote.id)));
	return savedNote;
};

const deleteNote = async (_id) => {
	await noteModel.deleteOne({ _id: _id });
};

const noteService = { getNotes, createNote, deleteNote, getNotebyId };

export default noteService;
