import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import tryCatch from "../middlewares/tryCatch";
import doctorController from "../controllers/doctor.controller";
import scheduleController from "../controllers/schedule.controller";

const router = Router();

router.post(
  "/charges",
  authMiddleware(),
  tryCatch(doctorController.createCharges)
);

router.post("/schedule", authMiddleware(), tryCatch(scheduleController.create));

export default router;
