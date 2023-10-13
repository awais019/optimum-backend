import express from "express";
import logger from "./startup/logger";

const app = express();

app.listen(3000, () => {
  logger.info("Server is listening on port 3000...");
});
