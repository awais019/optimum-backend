import { Express } from "express";
import index from "../routes/index";
import userRoutes from "../routes/user.routes";
import authRoutes from "../routes/auth.routes";

export default function (app: Express) {
  app.use("/api", index);
  app.use("/api/user", userRoutes);
  app.use("/api/auth", authRoutes);
}
