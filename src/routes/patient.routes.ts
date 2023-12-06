import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import tryCatch from "../middlewares/tryCatch";
import patientController from "../controllers/patient.controller";

const router = Router();

router.post("/", authMiddleware(), tryCatch(patientController.create));

export default router;
