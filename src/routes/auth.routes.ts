import { Router } from "express";
import validate from "../middlewares/validate";
import tryCatch from "../middlewares/tryCatch";
import authValidators from "../validators/auth.validator";
import authController from "../controllers/auth.controller";

const app = Router();

app.post(
  "/email/verify",
  validate(authValidators.verifyEmail),
  tryCatch(authController.verifyEmail)
);

app.post(
  "/email/resend",
  validate(authValidators.resendEmail),
  tryCatch(authController.resendEmail)
);

export default app;
