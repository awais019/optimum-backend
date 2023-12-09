import { Router } from "express";
import tryCatch from "../middlewares/tryCatch";
import adminMiddleware from "../middlewares/admin";
import adminController from "../controllers/admin.controller";

const router = Router();

router.post("/", tryCatch(adminController.create));

router.get("/doctors", tryCatch(adminController.getDoctors));

router.get("/doctors/:id", tryCatch(adminController.getDoctor));

router.put("/doctors/:id", tryCatch(adminController.verifyDoctor));

export default router;
