import { Router } from "express";
import validate from "../middlewares/validate";
import tryCatch from "../middlewares/tryCatch";
import userValidator from "../validators/user.validator";
import userController from "../controllers/user.controller";

const app = Router();

app.post("/", validate(userValidator.create), tryCatch(userController.create));

export default app;
