import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import { createConnection } from "typeorm";
import { createOptions } from './ormconfig';
import { config } from "./config";
import { HttpError, NotFoundError } from "./shared/exception";
import { logger } from "./shared/logger";

import ddyzdRouter from "./router";

dotenv.config({ path: path.join(__dirname, "../.env") });

const app: express.Application = express();

createConnection(createOptions).then((c) => {
  console.log("Database Connect Success");
}).catch(err => {
  console.error(err);
  process.exit(1);
});

app.set("port", config.ServicePort || "3000");

app.use(morgan("dev"));
app.use("/file/feed", express.static(path.join(__dirname, "feeds")));
app.use("/file/club", express.static(path.join(__dirname, "clubs")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/", ddyzdRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError(req.url));  
});

app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  logger.info(err.message);
  const statusCode: number = err.statusCode || 500;
  res.status(statusCode)
  .json({
    statusCode: statusCode,
    message: err.message,
    timeStamp: new Date(),
  });
});

app.listen(app.get("port"), () => {
  console.log("server on", app.get("port"));
});
