import express from "express";
import dotenv from "dotenv";
import logger from "./startup/logger";

dotenv.config();

const app = express();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  logger.info(`Server is listening on port ${port}...`);
});
