import { Router } from "express";
import validate from "../middlewares/validate";
import tryCatch from "../middlewares/tryCatch";
import authMiddleware from "../middlewares/auth";
import authValidators from "../validators/auth.validator";
import authController from "../controllers/auth.controller";

const app = Router();

// profile /me routes

app.put("/me", authMiddleware(), tryCatch(authController.updateProfile));

// email routes
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
