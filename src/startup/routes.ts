import { Express } from "express";
import index from "../routes/index";
import userRoutes from "../routes/user.routes";
import authRoutes from "../routes/auth.routes";
import doctorRoutes from "../routes/doctor.routes";
import patientRoutes from "../routes/patient.routes";
import adminRoutes from "../routes/admin.routes";

export default function (app: Express) {
  app.use("/api", index);
  app.use("/api/admin", adminRoutes);
  app.use("/api/user", userRoutes);
  app.use("/api/auth", authRoutes);
  app.use("/api/doctor", doctorRoutes);
  app.use("/api/patient", patientRoutes);
}
