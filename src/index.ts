import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import fileUpload from "express-fileupload";
import compression from "compression";
import logger from "./startup/logger";
import routes from "./startup/routes";

dotenv.config();

const app = express();
app.use([express.json(), helmet(), fileUpload(), compression()]);
routes(app);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  logger.info(`Server is listening on port ${port}...`);
});
