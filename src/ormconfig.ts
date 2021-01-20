import { ConnectionOptions } from "typeorm";
import { config } from "./config";

export const createOptions: ConnectionOptions = {
   type: "mysql",
   host: config.dbHost,
   port: config.dbPort,
   username: config.dbUser,
   password: config.dbPassword,
   database: config.dbName,
   synchronize: config.dbSynchronize,
   logging: config.dbLogging,
   entities: [
      "dist/entity/model/**/*.js",
      "dist/entity/view/**/*.js"
   ]
}