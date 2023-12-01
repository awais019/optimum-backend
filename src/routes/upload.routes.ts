import { Router } from "express";
import tryCatch from "../middlewares/tryCatch";
import authMiddleware from "../middlewares/auth";
import uploadController from "../controllers/upload.controller";

const router = Router();

router.post("/", authMiddleware(), tryCatch(uploadController.upload));

export default router;
