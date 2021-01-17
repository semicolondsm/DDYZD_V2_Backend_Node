import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import { createConnection } from "typeorm";
import { createOptions } from './ormconfig';
import { config } from "./configs";

dotenv.config({ path: path.join(__dirname, "../.env") });

const app: express.Application = express();

createConnection(createOptions).then(() => {
  console.log("Database Connect Success");
}).catch(err => {
  console.error(err);
  process.exit(1);
});

app.set("port", config.ServicePort || "3000");

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req: Request, res: Response, next: NextFunction) => {
  const allowOrigins: string[] = [process.env.ALLOW_ORIGIN1, process.env.ALLOW_ORIGIN2];
  const origin: string = req.headers.origin as string;
  if(allowOrigins.includes(origin)) {
    cors({
      origin,
      credentials: true,
    })(req, res, next);
  } else {
    next();
  }
});