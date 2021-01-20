import { createLogger, Logger, format, transports } from "winston";

const logger: Logger = createLogger({
  level: "info",
  format: format.json(),
  transports: [ 
    new transports.File({ filename: "./logs/combined.log" }),
    new transports.File({ filename: "./logs/error.log", level: "error" }),
  ],
});

export { logger }