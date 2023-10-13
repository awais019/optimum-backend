import { createLogger, format, transports } from "winston";

const { File, Console } = transports;

const logger = createLogger({
  format: format.json(),
  transports: [
    new File({ filename: "logs/combined.log", level: "info" }),
    new File({ filename: "logs/error.log", level: "error" }),
  ],
});

if (process.env.NODE_ENV != "production") {
  logger.add(
    new Console({
      format: format.simple(),
    })
  );
}

export default logger;
