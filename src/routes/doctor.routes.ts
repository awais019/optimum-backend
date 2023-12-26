import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import tryCatch from "../middlewares/tryCatch";
import doctorController from "../controllers/doctor.controller";

const router = Router();

router.post("/", authMiddleware(), tryCatch(doctorController.create));

router.get("/", authMiddleware(), tryCatch(doctorController.getAll));

router.get("/:id", authMiddleware(), tryCatch(doctorController.get));

router.post(
  "/charges",
  authMiddleware(),
  tryCatch(doctorController.createCharges)
);

router.post(
  "/schedule",
  authMiddleware(),
  tryCatch(doctorController.createSchedule)
);

router.post(
  "/location",
  authMiddleware(),
  tryCatch(doctorController.createLocation)
);

export default router;
