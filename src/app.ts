import "reflect-metadata";
import path from "path";
import dotenv from "dotenv";
import { logger } from "./shared/logger";
import { initApplication } from "./loader";

dotenv.config({ path: path.join(__dirname, "../.env") });

initApplication()
    .catch(() => console.error("server start failed"));

process.on("uncaughtException", (err: Error) => {
  console.error(err);
  logger.error("uncaughtException");
  logger.error(err);
});