import { Router } from "express";
import tryCatch from "../middlewares/tryCatch";
import adminMiddleware from "../middlewares/admin";
import adminController from "../controllers/admin.controller";

const router = Router();

router.post("/", tryCatch(adminController.create));

router.get("/doctors", adminMiddleware(), tryCatch(adminController.getDoctors));

router.get(
  "/doctors/:id",
  adminMiddleware(),
  tryCatch(adminController.getDoctor)
);

router.put(
  "/doctors/:id",
  adminMiddleware(),
  tryCatch(adminController.verifyDoctor)
);

export default router;
