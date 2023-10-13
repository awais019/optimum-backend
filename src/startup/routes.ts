import { Express } from "express";
import index from "../routes/index";

export default function (app: Express) {
  app.use("/api", index);
}
