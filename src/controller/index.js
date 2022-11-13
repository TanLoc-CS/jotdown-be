import { Router } from "express";

import noteRouter from "./routes/note.controller.js";
import authRouter from "./routes/auth.controller.js";

const api = Router();

authRouter(api);
noteRouter(api);

export default api;
