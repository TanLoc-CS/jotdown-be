import { Router } from "express";

import noteRouter from "./routes/note.controller.js";

const api = Router();

noteRouter(api);

export default api;
