import { v4 as uuidv4 } from "uuid";

// import logger from "../util/logger";
import noteModel from "../model/note.model.js";

const getNotes = async () => {
	const notes = noteModel.find({}).then((notes) => notes);
	return notes;
};

const getNotebyId = async (id) => {
	const note = noteModel.find({ id: id }).then((note) => note);
	return note;
};

const getNotebyTitle = async (searchValue) => {
	const notes = await noteModel.find({}).then((notes) => notes);
	return notes.filter(
		(note) => note.title.toLowerCase().indexOf(searchValue) !== -1
	);
};

const createNote = async (title, content) => {
	const note = new noteModel({
		id: uuidv4(),
		title: title,
		content: content,
		date: Date.now(),
	});

	return await noteModel.create(note);
};

const deleteNote = async (_id) => {
	await noteModel.deleteOne({ _id: _id });
};

const noteService = { getNotes, createNote, deleteNote, getNotebyId };

export default noteService;
