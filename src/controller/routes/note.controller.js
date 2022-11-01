import { Router } from "express";
import { StatusCodes } from "http-status-codes";

import noteService from "../../service/note.service.js";
import isAuthorized from "../../middleware/authentication.js";

const noteRouter = Router();

export default (app) => {
	app.use("/", noteRouter);

	noteRouter.get("/notes", isAuthorized, async (req, res) => {
		const userId = req.id;
		try {
			const notes = await noteService.getNotes(userId);
			return res.json(notes);
		} catch (error) {
			console.log(error);
		}
	});

	noteRouter.get("/note/:id", async (req, res) => {
		const id = req.params.id;
		try {
			const note = await noteService.getNotebyId(id);
			return res.json(note);
		} catch (error) {
			console.log(error);
		}
	});

	noteRouter.post("/note", isAuthorized, async (req, res) => {
		const userId = req.id;
		const { title, content } = req.body;
		try {
			await noteService.createNote(title, content, userId);
			return res.status(StatusCodes.CREATED).json({
				info: {
					message: "SUCCESS_CREATED",
				},
			});
		} catch (error) {}
	});

	noteRouter.delete("/note", async (req, res) => {
		const { _id } = req.body;
		try {
			await noteService.deleteNote(_id);
			return res.status(StatusCodes.OK).json({
				info: {
					_id: _id,
				},
			});
		} catch (error) {
			console.log(error);
		}
	});
};
